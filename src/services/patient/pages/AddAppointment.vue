<script setup>
import useVuelidate from '@vuelidate/core'
import { required, helpers, numeric } from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import ResizableTextarea from '../../../components/ResizableTextarea.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { computed, reactive  } from 'vue'
import OMCComponent from '@/components/common/form/OMCComponent.vue'
import { validateOMC } from '@/utils/validateOMC'
import { usePatientStore } from '@/services/patient/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const patientStore = usePatientStore()
const { is_patient_exist, isLoadingOMC } = storeToRefs(patientStore)
let isOMCFull = false

// т.к. сейчас у нас поле is_male это boolean
const male = true
const female = false

const patientForm = reactive({
  examination_id: 1,

  patientData: {
    patient_id: null,
    full_name: null,
    is_male: null,
    birth_date: null,
    height: null,
    weight: null,
  },

  receptionsList: [
    {
      blood_pressure: null,
      pulse: null,
      swell: null,
      complains: null,
      diagnosis: null,
      disease_complications: null,
      comorbidities: null,
      disease_anamnesis: null,
      life_anamnesis: null,
      echocardiogram_data: null,
      file: null
    }
  ], 
})

const addReception = () => {
  patientForm.receptionsList.push({
    blood_pressure: null,
    pulse: null,
    swell: null,
    complains: null,
    diagnosis: null,
    disease_complications: null,
    comorbidities: null,
    disease_anamnesis: null,
    life_anamnesis: null,
    echocardiogram_data: null,
    file: null
  })
}

const removeReception = (index) => {
  if (patientForm.receptionsList.length > 1) {
    patientForm.receptionsList.splice(index, 1)
  }
}

const rules = computed(() => ({
  patientForm: {
    patientData: {
      patient_id: {
        required: helpers.withMessage('Это обязательное поле', required),
        numeric: helpers.withMessage('Допускаются только цифры', numeric),
        name_validation: {
          $validator: validateOMC,
          $message: 'Длина 16 символов'
        }
      },
      full_name: {
        ...(!is_patient_exist.value && {
          required: helpers.withMessage('Это обязательное поле', required)
        })
      }
    }
  }
}))

const v$ = useVuelidate(rules, { patientForm })

function handleDateSelection(date) {
  console.log(date)
}

function addReceptionsListToFD(data, id) {
  data.append("blood_pressure", patientForm.receptionsList[id].blood_pressure);
  data.append("pulse", patientForm.receptionsList[id].pulse);
  data.append("complains", patientForm.receptionsList[id].complains);
  data.append("diagnosis", patientForm.receptionsList[id].diagnosis);
  data.append("disease_complications", patientForm.receptionsList[id].disease_complications);
  data.append("disease_anamnesis", patientForm.receptionsList[id].disease_anamnesis);
  data.append("life_anamnesis", patientForm.receptionsList[id].life_anamnesis);
  data.append("echocardiogram_data", patientForm.receptionsList[id].echocardiogram_data);
  data.append("comorbidities", patientForm.receptionsList[id].comorbidities);
  data.append("swell", patientForm.receptionsList[id].swell);
}

function addPatientDataToFD(data) {
  data.append("patient_id", patientForm.patient_id);
  data.append("full_name", patientForm.patientData.full_name);
  data.append("is_male", patientForm.patientData.is_male);
  data.append("birth_date", patientForm.patientData.birth_date.toISOString().split('T')[0]);
  data.append("height", patientForm.patientData.height);
  data.append("weight", patientForm.patientData.weight);
}

// Сохранение patientForm в бд и редиарект на страничку Дашборда TODO: редиарект на страничку "История обследования"
async function handleAddAppointment() {
  v$.value.$touch()
  if (!v$.value.$error) {
    if (is_patient_exist.value) {
      let appointment = new FormData();

      // пока что отправляется только первый элемент из receptionsList TODO
      // receptionsList[0]
      addReceptionsListToFD(appointment, 0)
      await patientStore.addAppointment(appointment, patientForm.examination_id)
    }
    else {
      let examination = new FormData();

      // patientData
      addPatientDataToFD(examination);

      // пока что отправляется только первый элемент из receptionsList TODO
      // receptionsList[0]
      addReceptionsListToFD(examination, 0);

      await patientStore.createExamination(examination)
    }
    await router.push({ name: 'AppointmentsHistory' })
  }
}

// Проверка присутсвует ли уже пользователь с таким ОМС в бд на бэке
async function handleOMCChange(OMCNumber) {
  patientForm.patient_id = OMCNumber
  await patientStore.getPatient(OMCNumber?.toString())
}

function handleOMCAccept(OMC) {
  isOMCFull = OMC.length === 16
}

</script>

<template>
  <div>
    <div class="">
      <PageHeaderComponent title="Оформление нового обследования" />
      <p class="py-4 text-gray-400">Пожалуйста, заполните следующие поля</p>
    </div>

    <div class="w-full bg-white rounded-2xl">
      <form
        @submit.prevent="handleAddAppointment"
        class="flex flex-col space-y-8"
        autocomplete="off"
      >
        <div class="px-6 pt-6 space-y-4">
          <!-- Полис -->
          <OMCComponent
            v-model="v$.patientForm.patientData.patient_id.$model"
            :errors-list="v$.patientForm.patientData.patient_id.$errors"
            @onAccept="handleOMCAccept"
            @onCompleted="handleOMCChange"
            :is-loading="isLoadingOMC"
          />

          <!-- ФИО -->
          <div v-if="!is_patient_exist || !isOMCFull">
            <label for="patientData.full_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Фамилия Имя Отчество:</label
            >
            <input
              v-model="v$.patientForm.patientData.full_name.$model"
              type="text"
              id="patientData.full_name"
              class="ad-input"
              placeholder=""
            />
            <ErrorComponent :errors="v$.patientForm.patientData.full_name.$errors" />
          </div>
        </div>
        <div v-if="!is_patient_exist || !isOMCFull" class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <!-- Пол -->
            <div>
              <label for="patientData.is_male" class="block mb-2 text-sm font-medium text-gray-900">Пол:</label>
              <select id="patientData.is_male" name="patientData.is_male" v-model="patientForm.patientData.is_male" class="ad-input">
                <option value=true>Мужчина</option>
                <option value=false>Женщина</option>
              </select>
            </div>

            <div>
              <label for="patientData.height" class="block mb-2 text-sm font-medium text-gray-900"
                >Рост (в см):</label
              >
              <input
                v-model="patientForm.patientData.height"
                type="number"
                id="patientData.height"
                class="ad-input"
                min="0"
                max="300"
              />
            </div>

            <!-- Вес -->
            <div>
              <label for="patientData.weight" class="block mb-2 text-sm font-medium text-gray-900"
                >Вес (в кг):</label
              >
              <input
                v-model="patientForm.patientData.weight"
                type="number"
                id="patientData.weight"
                class="ad-input"
                min="0"
                max="700"
                step="1"
              />
            </div>
          </div>
          <!-- Дата Рождения -->
          <div>
            <label for="patientData.birth_date" class="block mb-2 text-sm font-medium text-gray-900"
              >Дата Рождения:</label
            >
            <VueDatePicker
              @update:model-value="handleDateSelection"
              v-model="patientForm.patientData.birth_date"
              locale="ru-Ru"
              format="dd/MM/yyyy"
              cancelText="Отменить"
              selectText="Выбрать"
              id="patientData.birth_date"
              class="py-1.5"
              text-input
              :enable-time-picker="false"
              :action-row="{ showNow: true }"
              now-button-label="Сегодня"
            />
          </div>
        </div>
          <!-- examination_id -->
          <div v-if="is_patient_exist && isOMCFull" class="grid grid-cols-1 lg:grid-cols-1 gap-4 px-6">
              <label for="patientData.examination_id" class="block mb-2 text-sm font-medium text-gray-900"
                >examination_id:</label
              >
              <input
                v-model="patientForm.examination_id"
                type="number"
                id="patientData.examination_id"
                class="ad-input"
              />
            </div>

        <fieldset class="rounded-md space-y-4 px-6 w-full">
          <TransitionGroup name="list" tag="ul">
            <fieldset
              v-for="(reception, index) in patientForm.receptionsList"
              :key="index"
              class="border white mb-4 relative border-solid border-gray-300 p-3 rounded-md lg:grid lg:grid-cols-2 lg:space-y-0 space-y-4 lg:gap-4 w-full"
            >
              <legend class="">Прием №{{ index + 1 }} от 11.10.2023</legend>
              <button
                v-if="patientForm.receptionsList.length > 1"
                @click.prevent="removeReception(index)"
                class="absolute text-red-500 transition-all hover:text-white hover:bg-red-500 -top-6 -right-4 bg-white border rounded-full p-2"
              >
                <HeroIcon icon-type="outline" icon-name="XMarkIcon" class="h-5 w-5" />
              </button>
              <div class="col-span-2">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <!-- Кровяное давление -->
                  <div>
                    <label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900"
                      >Кровяное давление:</label
                    >
                    <input
                      v-model="reception.blood_pressure"
                      type="text"
                      id="blood_pressure"
                      class="ad-input"
                    />
                  </div>

                  <!-- Пульс -->
                  <div>
                    <label for="pulse" class="block mb-2 text-sm font-medium text-gray-900"
                      >Пульс:</label
                    >
                    <input
                      v-model="reception.pulse"
                      type="number"
                      id="pulse"
                      class="ad-input"
                      min="0"
                      max="250"
                    />
                  </div>

                  <!-- Отечность -->
                  <div>
                    <label for="swell" class="block mb-2 text-sm font-medium text-gray-900"
                      >Отечность:</label
                    >
                    <input
                      v-model="reception.swell"
                      type="text"
                      id="swell"
                      class="ad-input"
                    />
                  </div>
                </div>
              </div>

              <!-- Жалобы -->
              <ResizableTextarea id="complains" label="Жалобы:" v-model="reception.complains" />

              <!-- Диагноз -->
              <ResizableTextarea id="diagnosis" label="Диагноз:" v-model="reception.diagnosis" />

              <!-- Осложнения -->
              <ResizableTextarea
                id="disease_complications"
                label="Осложнения:"
                v-model="reception.disease_complications"
              />

              <!-- Сопуствующие заболевания -->
              <ResizableTextarea
                id="comorbidities"
                label="Сопуствующие заболевания:"
                v-model="reception.comorbidities"
              />

              <!-- Анамнез в течение жизни -->
              <ResizableTextarea
                id="life_anamnesis"
                label="Анамнез в течение жизни:"
                v-model="reception.life_anamnesis"
              />

              <!-- Анамнез в течение болезни -->
              <ResizableTextarea
                id="disease_anamnesis"
                label="Анамнез в течение болезни:"
                v-model="reception.disease_anamnesis"
              />

              <!-- Данные по ЭхоКТ -->
              <ResizableTextarea
                class="col-span-2"
                id="echocardiogram_data"
                label="Данные по ЭхоКТ:"
                v-model="reception.echocardiogram_data"
              />

            </fieldset>
          </TransitionGroup>
        </fieldset>

        <div class="flex justify-end items-center bg-gray-50 p-6">
          <router-link :to="{ name: 'AppointmentsHistory' }" class="mr-4">Отменить</router-link>
          <button type="submit" class="ad-primary-btn">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>
