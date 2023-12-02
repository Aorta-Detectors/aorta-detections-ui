<script setup>
import useVuelidate from '@vuelidate/core'
import { required, helpers, numeric } from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import ResizableTextarea from '../../../components/ResizableTextarea.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import OMCComponent from '@/components/common/form/OMCComponent.vue'
import { validateOMC } from '@/utils/validateOMC'
import { usePatientStore } from '@/services/patient/store'
import { useRoute, useRouter } from 'vue-router'
import InfoRequests from '@/services/patient/requests'
import Notification from '@/utils/Notification'
import { OMC_NOT_FOUND } from '@/constants/conts'
import { storeToRefs } from 'pinia'

const router = useRouter()
const currentRoute = ref(useRoute())
const patientStore = usePatientStore()
const {isLoading: isCreating} = storeToRefs(patientStore)

let isOMCFull = false
let isLoadingOMC = ref(false)
let is_patient_exist = ref(false)

const patientForm = reactive({
  examination_id: null,
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
      blood_pressure: '',
      pulse: '',
      swell: '',
      complains: '',
      diagnosis: '',
      disease_complications: '',
      comorbidities: '',
      disease_anamnesis: '',
      life_anamnesis: '',
      echocardiogram_data: '',
      file: ''
    }
  ], 
})

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

async function handleAddAppointment() {
  v$.value.$touch()
  if (!v$.value.$error) {
    let examination = new FormData();
    addPatientDataToFD(examination);
    addReceptionsListToFD(examination, 0);
    await patientStore.createExamination(examination)
    await router.push({ name: 'AppointmentsHistory' })
  }
}

onMounted(()=> {
  let omc = currentRoute.value.query
  if('id' in omc){
    handleOMCChange(omc.id)
  }
})


async function handleOMCChange(OMCNumber) {
  isLoadingOMC.value = true
  try {
    const { data  } = await InfoRequests.get_patient(OMCNumber)
    is_patient_exist.value = true

    let birth_date = null

    if('birth_date' in data && data.birth_date !== null){
      birth_date = new Date(data.birth_date)
    }
    await router.push({ name: 'AddAppointment', query: { id: data.patient_id } })

    patientForm.patientData = {
      ...data,
      birth_date: birth_date,
      patient_id: data.patient_id
    }

  } catch (e) {
    await resetPatientData()
    Notification.error(OMC_NOT_FOUND)
  } finally {
    isLoadingOMC.value = false
  }
}

async function resetPatientData(){
  patientForm.patientData = {
    ...patientForm.patientData,
    full_name: null,
    is_male: null,
    birth_date: null,
    height: null,
    weight: null,
  }
  is_patient_exist.value = false
  await router.push({ name: 'AddAppointment', query: null })
  v$.value.$reset()
}

function handleOMCAccept(OMC) {
  isOMCFull = OMC.length === 16
}

function addReceptionsListToFD(data, index) {
  const form = patientForm.receptionsList[index]
  if (!form) return
  data.append("blood_pressure", form.blood_pressure);
  data.append("pulse", form.pulse);
  data.append("complains", form.complains);
  data.append("diagnosis", form.diagnosis);
  data.append("disease_complications", form.disease_complications);
  data.append("disease_anamnesis", form.disease_anamnesis);
  data.append("life_anamnesis", form.life_anamnesis);
  data.append("echocardiogram_data", form.echocardiogram_data);
  data.append("comorbidities", form.comorbidities);
  data.append("swell", form.swell);
}

function addPatientDataToFD(data) {
  const form = patientForm.patientData
  if (!form) return
  data.append("patient_id", form.patient_id);
  data.append("full_name", form.full_name);
  data.append("is_male", form.is_male);
  data.append("birth_date", form?.birth_date.toISOString().split('T')[0]);
  data.append("height", form.height);
  data.append("weight", form.weight);
}
</script>

<template>
  <div>
    <div class="">
      <PageHeaderComponent title="Оформление нового обследования" />
      <p class="py-4 text-gray-400">Пожалуйста, заполните следующие поля</p>
    </div>

    <div class="">
      <form
        @submit.prevent="handleAddAppointment"
        class="flex flex-col space-y-8"
        autocomplete="off"
      >
        <div class='w-full bg-white rounded-2xl p-6  space-y-4'>
          <div class="space-y-4">
            <!-- Полис -->
            <OMCComponent
              v-model="v$.patientForm.patientData.patient_id.$model"
              :errors-list="v$.patientForm.patientData.patient_id.$errors"
              @onAccept="handleOMCAccept"
              @onCompleted="handleOMCChange"
              :is-loading="isLoadingOMC"
            />

           <div class='flex w-full space-x-4'>
             <!-- ФИО -->
             <div class=w-full>
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
          </div>
          <div  class="grid grid-cols-1  gap-4 ">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
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
              <!-- Пол -->
              <div>
                <label for="patientData.is_male" class="block mb-2 text-sm font-medium text-gray-900">Пол:</label>
                <select id="patientData.is_male" name="patientData.is_male" v-model="patientForm.patientData.is_male" class="ad-input">
                  <option value=true>Мужчина</option>
                  <option value=false>Женщина</option>
                </select>
              </div>
            </div>
            <!-- Дата Рождения -->
            <div>
              <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900"
              >Дата Рождения:</label
              >
              <VueDatePicker
                v-model="patientForm.patientData.birth_date"
                locale="ru-Ru"
                format="dd/MM/yyyy"
                cancelText="Отменить"
                selectText="Выбрать"
                id="birth_date"
                :enable-time-picker="false"
                :action-row="{ showNow: true }"
                now-button-label="Сегодня"
                input-class-name='py-6'
              />
            </div>
          </div>
        </div>
        <fieldset class=" space-y-4 p-6  w-full bg-white rounded-2xl">
          <TransitionGroup name="list" tag="ul">
            <fieldset
              v-for="(reception, index) in patientForm.receptionsList"
              :key="index"
              class="mb-4 relative rounded-md lg:grid lg:grid-cols-2 lg:space-y-0 space-y-4 lg:gap-4 w-full"
            >
              <legend class="mb-4">Прием №{{ index + 1 }}</legend>
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

        <div class="flex justify-end items-center p-6">
          <router-link :to="{ name: 'AppointmentsHistory' }" class="mr-4">Отменить</router-link>
          <button type="submit" class="ad-primary-btn">{{isCreating ? 'В работе...': 'Добавить'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>
