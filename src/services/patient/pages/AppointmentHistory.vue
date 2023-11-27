<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, onMounted, reactive, watch } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'
import ResizableTextarea from '@/components/ResizableTextarea.vue'
import { storeToRefs } from 'pinia'
import { usePatientStore } from '@/services/patient/store'
import { convertToLocalTime } from '@/utils/useLocalTimeConverter'
import InfoRequests from '@/services/patient/requests'
import { handleError } from '@/utils/handleError'
import Notification from '@/utils/Notification'

let appForm = reactive({
  patient_id: null,
  creator_id: null,
  created_at: null,
  examination_id: null,
  patient: {
    patient_id: null,
    full_name: null,
    birth_date: null,
    is_male: null,
    height: null,
    weight: null
  },
  appointments: [

  ]
})

const route = useRoute()
const store = usePatientStore()
const { examination } = storeToRefs(store)
const id = computed(() => route?.params?.id)

onMounted(() => {
  if (id.value) {
    store.getExaminationById(id.value)
  }

})

watch(()=>examination.value, (newExamination)=> {
  if(newExamination){
    appForm = {
      ...newExamination,
      appointments: [...newExamination.appointments]
    }
  }
}, {immediate: true, deep: true} )

const addNewAppointment = () => {
  appForm.appointments.push({
    user_id: null,
    examination_id: null,
    appointment_time: null,
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
    is_ready: false,
    appointment_id: 0
  })
}

const removeReception = (index) => {
  if (appForm.appointments.length > 1) {
    appForm.appointments.splice(index, 1)
  }
}

const  handleSubmitAppointment = async () => {

  // TODO: add form  validations

  let lastAppointment = appForm.appointments.pop()
  let fd = new FormData
  
  if(lastAppointment){
    fd.append("blood_pressure", lastAppointment.blood_pressure);
    fd.append("pulse", lastAppointment.pulse);
    fd.append("complains", lastAppointment.complains);
    fd.append("diagnosis", lastAppointment.diagnosis);
    fd.append("disease_complications", lastAppointment.disease_complications);
    fd.append("disease_anamnesis", lastAppointment.disease_anamnesis);
    fd.append("life_anamnesis", lastAppointment.life_anamnesis);
    fd.append("echocardiogram_data", lastAppointment.echocardiogram_data);
    fd.append("comorbidities", lastAppointment.comorbidities);
    fd.append("swell", lastAppointment.swell);

    // TODO: validate and send
    try {
      const { data, status } = await  Notification.promise(InfoRequests.add_appointment(fd, id.value))
      if (id.value) {
        await store.getExaminationById(id.value)
      }
    }
    catch (e) {
      const errorMessage = handleError(e);
      console.error(errorMessage);
      throw e;
    }

  }
}

function handleDateSelection(date) {
  console.log(date)
}

</script>

<template>
  <div class="overflow-x-auto">
    <PageHeaderComponent :title="`Обследования №${examination?.examination_id} от ${convertToLocalTime(examination?.created_at)}`" >
      <router-link :to="{name: 'ViewAppointmentReport', params: {id: id}}"  class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none">
        <HeroIcon icon-type="outline" icon-name="DocumentChartBarIcon" class="block h-6 w-6" aria-hidden="true"/>
        <span>Посмотреть отчет</span>
      </router-link>
    </PageHeaderComponent>

    <div class="mt-8">
      <div class="w-full mt-10 border p-6 bg-white rounded-2xl">
        <form
          @submit.prevent="handleSubmitAppointment"
          class="flex flex-col space-y-8"
          autocomplete="off"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Полис -->
            <div>
              <label for="OMC" class="block mb-2 text-sm text-gray-900">Номер полиса ОМС:</label>
              <input
                v-model='appForm.patient.patient_id'
                type="text"
                id="OMC"
                class="ad-input"
                placeholder=""
              />
            </div>

            <!-- ФИО -->
            <div>
              <label for="FIO" class="block mb-2 text-sm text-gray-900"
                >Фамилия Имя Отчество:</label
              >
              <input
                v-model='appForm.patient.full_name'
                type="text"
                id="FIO"
                class="ad-input"
                placeholder=""
              />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <!-- Пол -->
              <div>
                <label for="sex" class="block mb-2 text-sm text-gray-900">Пол:</label>
                <select id="sex" name="sex" v-model='appForm.patient.is_male'  class="ad-input">
                  <option :value="true">Мужчина</option>
                  <option :value="false">Женщина</option>
                </select>
              </div>

              <!-- Рост -->
              <div>
                <label for="height" class="block mb-2 text-sm text-gray-900">Рост (в см):</label>
                <input
                  v-model='appForm.patient.height'
                  type="number"
                  id="height"
                  class="ad-input"
                  min="0"
                  max="300"
                />
              </div>

              <!-- Вес -->
              <div>
                <label for="weight" class="block mb-2 text-sm text-gray-900">Вес (в кг):</label>
                <input
                  type="number"
                  v-model='appForm.patient.weight'
                  id="weight"
                  class="ad-input"
                  min="0"
                  max="700"
                  step="0.1"
                />
              </div>
            </div>
            <!-- Дата Рождения -->
            <div>
              <label for="birth_date" class="block mb-2 text-sm text-gray-900"
                >Дата Рождения:</label
              >
              <VueDatePicker
                @update:model-value="handleDateSelection"
                v-model='appForm.patient.birth_date'
                locale="ru-Ru"
                format="dd/MM/yyyy"
                cancelText="Отменить"
                selectText="Выбрать"
                id="birth_date"
                class="py-1.5"
                text-input
                :enable-time-picker="false"
                :action-row="{ showNow: true }"
                now-button-label="Сегодня"
              />
            </div>
            </div>

          <div v-if='examination && examination.appointments.length' class='space-y-3 flex flex-col'>

            <div v-for="(appointment, index) in appForm.appointments" :key='appointment?.appointment_id' class='mb-4 border p-6 rounded-xl relative'>
              <!--   TODO: just for demo (do refactoring of appForm?.appointments?.length > 1 && appointment_id === 0 ) -->
              <button
                v-if="appForm?.appointments?.length > 1"
                @click.prevent="removeReception(index)"
                class="absolute text-red-500 transition-all hover:text-white hover:bg-red-500 -top-6 -right-4 bg-white border rounded-full p-2"
              >
                <HeroIcon icon-type="outline" icon-name="XMarkIcon" class="h-5 w-5" />
              </button>
              <details class="group" open>
                <summary class="cursor-pointer flex justify-between items-center">
                  <span>{{`Прием  №${appointment?.appointment_id}`}}</span>
                  <span class='text-gray-400'>{{`от ${convertToLocalTime(examination?.created_at)}`}}</span>
                </summary>
                <div class='space-y-4 py-5'>
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <!-- Кровяное давление -->
                    <div>
                      <label for="blood_pressure" class="block mb-2 text-sm text-gray-900"
                      >Кровяное давление:</label
                      >
                      <input
                        v-model='appointment.blood_pressure'
                        type="text"
                        id="blood_pressure"
                        class="ad-input"
                      />
                    </div>

                    <!-- Пульс -->
                    <div>
                      <label for="height" class="block mb-2 text-sm text-gray-900">Пульс:</label>
                      <input
                        type="number"
                        v-model='appointment.pulse'
                        id="height"
                        class="ad-input"
                        min="0"
                        max="250"
                      />
                    </div>


                    <!-- Отечность -->
                    <div>
                      <label for="swelling" class="block mb-2 text-sm text-gray-900">Отечность:</label>
                      <input v-model='appointment.swell' type="text" id="swelling" class="ad-input" />
                    </div>
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <!-- Жалобы -->
                    <ResizableTextarea id="complaints" label="Жалобы:" v-model='appointment.complains'  />

                    <!-- Диагноз -->
                    <ResizableTextarea id="diagnosis" label="Диагноз:" v-model='appointment.diagnosis' />

                    <!-- Осложнения -->
                    <ResizableTextarea
                      id="complications"
                      label="Осложнения:"
                      v-model='appointment.disease_complications'
                    />

                    <!-- Сопуствующие заболевания -->
                    <ResizableTextarea
                      id="accompanying_illnesses"
                      label="Сопуствующие заболевания:"
                    />

                    <!-- Анамнез в течение жизни -->
                    <ResizableTextarea
                      id="anamnesis_life"
                      label="Анамнез в течение жизни:"
                      v-model='appointment.disease_anamnesis'
                    />

                    <!-- Анамнез в течение болезни -->
                    <ResizableTextarea
                      id="anamnesis_illness"
                      v-model='appointment.life_anamnesis'
                      label="Анамнез в течение болезни:"
                    />

                    <!-- Данные по ЭхоКТ -->
                    <ResizableTextarea
                      id="EKG_data"
                      v-model='appointment.echocardiogram_data'
                      label="Данные по ЭхоКТ:"
                    />
                  </div>
                </div>
              </details>
            </div>

            <button @click.prevent="addNewAppointment" class="flex space-x-2 items-center">
              <HeroIcon icon-type="outline" icon-name="PlusCircleIcon" class="h-5 w-5" />
              <span>Добавить прием</span>
            </button>
          </div>

          <div class="flex justify-end items-center">
            <router-link :to="{ name: 'AppointmentsHistory' }" class="mr-4">Отменить</router-link>
            <button type="submit" class="ad-primary-btn">Сохранить</button>
          </div>
        </form>
      </div>

      <div class="flex space-x-3 mt-6">
        <form
          @submit.prevent
          class="bg-white col-span-2 text-gray-300 group border hover:border-2 duration-300 hover:cursor-pointer transition-all relative border-dashed border-theme-primary0 h-[400px] rounded-xl flex justify-center items-center w-full"
        >
          <div
            class="flex items-center justify-center flex-col space-y-2 group-hover:text-theme-primary10"
          >
            <HeroIcon icon-type="outline" icon-name="ArrowUpTrayIcon" />
            <span>Загрузить файлы</span>
          </div>

          <button
            type="submit"
            class="absolute bottom-2 right-2 bg-theme-primary10 hover:bg-theme-primary20 text-white px-4 py-2 rounded-tl-xl rounded-br-xl"
          >
            Сохранить
          </button>
        </form>
        <div class="lg:block hidden w-[400px] border p-6 bg-white rounded-xl">
          <ol class="relative text-gray-500 border-l ml-4 border-gray-200">
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-theme-primary60"
              >
                <HeroIcon icon-type="outline" icon-name="ArrowPathIcon" class="animate-spin" />
              </span>
              <h3 class="leading-tight">Pre Processing</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="my-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                2
              </span>
              <h3 class="leading-tight">Aortic Segmentation</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                3
              </span>
              <h3 class="leading-tight">Segmentation Networks</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                4
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                5
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                6
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
