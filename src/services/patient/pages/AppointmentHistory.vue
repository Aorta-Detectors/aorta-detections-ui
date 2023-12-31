<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import ResizableTextarea from '@/components/ResizableTextarea.vue'
import { usePatientStore } from '@/services/patient/store'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { convertToLocalTime } from '@/utils/useLocalTimeConverter'
import InfoRequests from '@/services/patient/requests'
import { handleError } from '@/utils/handleError'
import Notification from '@/utils/Notification'
import { appointmentItem, OMC_NOT_FOUND } from '@/constants/conts'
import UploadMedia from '@/services/patient/parials/UploadMedia.vue'
import SegmentationSteps from '@/services/patient/parials/SegmentationSteps.vue'
import AorticComponent from '@/services/patient/parials/AorticComponent.vue'

const isOpen = ref(false)

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
  appointments: []
})

const route = useRoute()
const router = useRouter()

const store = usePatientStore()
const { examination, appointmentGet, appointmentsList } = storeToRefs(store)
const id = computed(() => route?.params?.id)
onMounted(async () => {
  if (id.value) {
    await store.getExaminationById(id.value)
  }
})

let newAppointment = reactive({
  ...appointmentItem
})

const removeReception = async (index, appointment) => {
  // TODO: do refactoring: just for demo
  if (appointment?.hasOwnProperty('appointment_id') && appointment.appointment_id !== null) {
    try {
      await Notification.promise(InfoRequests.delete_appointment(appointment.appointment_id))
      if (id.value) {
        await store.getExaminationById(id.value)
      }
    } catch (e) {
      consoleError(e)
    }
  } else {
    // TODO: check if appForm.appointments.length > 1
    appForm.appointments.splice(index, 1)
  }
}

let isUploading = ref(false)

async function handleUpdateSingleAppointment(appointment) {
  if (appointment) {
    try {
      await Notification.promise(
        InfoRequests.update_appointment(patchAppointment(appointment), appointment.appointment_id)
      )
      if (id.value) {
        await store.getExaminationById(id.value)
      }
    } catch (e) {
      Notification.error(OMC_NOT_FOUND)
    }
  }
}

const handleSubmitAppointment = async () => {
  try {
    await Notification.promise(
      InfoRequests.add_appointment(patchAppointment(newAppointment), id.value)
    )
    if (id.value) {
      await store.getExaminationById(id.value)
    }
  } catch (e) {
    consoleError(e)
  }
}

function patchAppointment(appointment) {
  let fd = new FormData()
  const parseValue = (value) => value || ''

  fd.append('blood_pressure', parseValue(appointment.blood_pressure))
  fd.append('pulse', parseValue(appointment.pulse))
  fd.append('swell', parseValue(appointment.swell))
  fd.append('complains', parseValue(appointment.complains))
  fd.append('diagnosis', parseValue(appointment.diagnosis))
  fd.append('disease_complications', parseValue(appointment.disease_complications))
  fd.append('comorbidities', parseValue(appointment.comorbidities))
  fd.append('disease_anamnesis', parseValue(appointment.disease_anamnesis))
  fd.append('life_anamnesis', parseValue(appointment.life_anamnesis))
  fd.append('echocardiogram_data', parseValue(appointment.echocardiogram_data))

  return fd
}

function consoleError(e) {
  const errorMessage = handleError(e)
  console.error(errorMessage)
  throw e
}

function handleDateSelection(date) {
  console.log(date)
}

function handleUpdateAppointment() {}

function closeModal() {
  isOpen.value = false
}

async function openModal() {
  await store.getExamination(id.value)
  console.log('openModal', appointmentsList)
  isOpen.value = true
}

async function openAppointment(examination_id, appointment_id) {
  await router.push({
    name: 'ViewAppointmentReport',
    params: { id: examination_id, appointment_id: appointment_id },
    query: { OMCnumber: examination.value.patient.patient_id }
  })
}
</script>

<template>
  <div class="overflow-x-auto">
    <PageHeaderComponent
      :title="`Обследование №${examination?.examination_id} от ${convertToLocalTime(
        examination?.created_at
      )}`"
    >
      <button
        @click="openModal"
        class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none"
      >
        <HeroIcon
          icon-type="outline"
          icon-name="DocumentChartBarIcon"
          class="block h-6 w-6"
          aria-hidden="true"
        />
        <span>Посмотреть отчет</span>
      </button>
    </PageHeaderComponent>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Выберите нужный приём
                </DialogTitle>
                <fieldset
                  v-for="(appointment, index) in appointmentsList"
                  :key="index"
                  class="white mb-4 relative p-1 lg:grid lg:grid-cols-1 lg:space-y-0 space-y-1 lg:gap-1 w-full"
                >
                  <a
                    href="#"
                    class="group block col-span-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-slate-100"
                  >
                    <div class="flex items-center">
                      <h3 class="text-slate-900 text-sm font-semibold">
                        {{ 'Приём №' + appointment?.appointment_id }}
                      </h3>
                      <span>&nbsp;</span>
                      <h3 class="text-slate-900 text-sm font-semibold">
                        {{ 'от ' + new Date(appointment.appointment_time).toLocaleDateString() }}
                      </h3>
                      <!-- <span>&nbsp;</span>
                      <h3 class="text-slate-900 text-sm font-semibold">{{ ", время: " + new Date(appointment.appointment_time).toLocaleTimeString() }}</h3> -->
                      <button
                        @click="openAppointment(id, appointment.appointment_id)"
                        class="ml-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      >
                        Посмотреть
                      </button>
                    </div>
                  </a>
                </fieldset>
                <button
                  type="button"
                  class="inline-flex ml-auto justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Закрыть
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="mt-8">
      <div class="w-full mt-10">
        <div class="flex flex-col space-y-8">
          <div v-if="examination" class="grid grid-cols-1 gap-4 border p-6 bg-white rounded-2xl">
            <!-- Полис -->
            <div>
              <h2 class="text-gray-400 text-xl mb-4">Информация о пациенте</h2>
              <label for="OMC" class="block mb-2 text-sm text-gray-900">Номер полиса ОМС:</label>
              <input
                v-model="examination.patient.patient_id"
                disabled
                type="text"
                id="OMC"
                class="ad-input"
              />
            </div>

            <!-- ФИО -->
            <div>
              <label for="FIO" class="block mb-2 text-sm text-gray-900"
                >Фамилия Имя Отчество:</label
              >
              <input
                v-model="examination.patient.full_name"
                type="text"
                id="FIO"
                class="ad-input"
                disabled
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <!-- Пол -->
              <div>
                <label for="sex" class="block mb-2 text-sm text-gray-900">Пол:</label>
                <select
                  id="sex"
                  name="sex"
                  disabled
                  v-model="examination.patient.is_male"
                  class="ad-input"
                >
                  <option :value="true">Мужчина</option>
                  <option :value="false">Женщина</option>
                </select>
              </div>

              <!-- Рост -->
              <div>
                <label for="height" class="block mb-2 text-sm text-gray-900">Рост (в см):</label>
                <input
                  v-model="examination.patient.height"
                  type="number"
                  id="height"
                  class="ad-input"
                  disabled
                />
              </div>

              <!-- Вес -->
              <div>
                <label for="weight" class="block mb-2 text-sm text-gray-900">Вес (в кг):</label>
                <input
                  type="number"
                  v-model="examination.patient.weight"
                  id="weight"
                  class="ad-input"
                  disabled
                />
              </div>
              <!-- Дата Рождения -->
              <div>
                <label for="birth_date" class="block mb-2 text-sm text-gray-900"
                  >Дата Рождения :</label
                >
                <input
                  type="text"
                  :value="examination.patient.birth_date"
                  id="birth_date"
                  class="ad-input"
                  disabled
                />
              </div>
            </div>
          </div>
          <div
            v-if="examination && examination?.appointments && examination?.appointments?.length"
            class="space-y-3 flex flex-col"
          >
            <div
              v-for="(appointment, index) in examination.appointments"
              :key="index"
              class="mb-4 group bg-white border p-6 rounded-xl relative"
            >
              <!--   TODO: just for demo (do refactoring of appForm?.appointments?.length > 1 && appointment_id === 0 ) -->
              <button
                v-if="appForm?.appointments?.length > 1"
                @click.prevent="removeReception(index, appointment)"
                class="absolute text-red-500 transition-all hover:text-white hover:bg-red-500 -top-6 -right-4 bg-white border rounded-full p-2"
              >
                <HeroIcon icon-type="outline" icon-name="XMarkIcon" class="h-5 w-5" />
              </button>
              <details class="group">
                <summary class="cursor-pointer flex justify-between items-center">
                  <span class="flex flex-col">
                    <span class="group-hover:text-theme-primary0">{{
                      `Прием  №${appointment?.appointment_id}`
                    }}</span>
                    <span class="bg-gray-50 px-4 py-2 flex flex-col mt-3">
                      <span class="text-gray-600 text-sm">Врач {{ appointment?.doctor_name }}</span>
                      <span
                        v-if="!!appointment.file_hash"
                        class="text-green-400 text-sm inline-flex space-x-1.5"
                      >
                        <HeroIcon
                          icon-type="outline"
                          icon-name="CheckCircleIcon"
                          class="w-4 pt-0.5"
                        />
                        <span class="first-letter:capitalize">аорты загружены</span>
                      </span>
                    </span>
                  </span>

                  <span class="text-gray-400">{{
                    `от ${convertToLocalTime(examination?.created_at)}`
                  }}</span>
                </summary>
                <div class="space-y-4 py-5">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <!-- Кровяное давление -->
                    <div>
                      <label for="blood_pressure" class="block mb-2 text-sm text-gray-900"
                        >Кровяное давление:</label
                      >
                      <input
                        v-model="appointment.blood_pressure"
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
                        v-model="appointment.pulse"
                        id="height"
                        class="ad-input"
                        min="0"
                        max="250"
                      />
                    </div>

                    <!-- Отечность -->
                    <div>
                      <label for="swelling" class="block mb-2 text-sm text-gray-900"
                        >Отечность:</label
                      >
                      <input
                        v-model="appointment.swell"
                        type="text"
                        id="swelling"
                        class="ad-input"
                      />
                    </div>
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <!-- Жалобы -->
                    <ResizableTextarea
                      id="complaints"
                      label="Жалобы:"
                      v-model="appointment.complains"
                    />

                    <!-- Диагноз -->
                    <ResizableTextarea
                      id="diagnosis"
                      label="Диагноз:"
                      v-model="appointment.diagnosis"
                    />

                    <!-- Осложнения -->
                    <ResizableTextarea
                      id="complications"
                      label="Осложнения:"
                      v-model="appointment.disease_complications"
                    />

                    <!-- Сопуствующие заболевания -->
                    <ResizableTextarea
                      id="accompanying_illnesses"
                      label="Сопуствующие заболевания:"
                      v-model="appointment.comorbidities"
                    />

                    <!-- Анамнез в течение жизни -->
                    <ResizableTextarea
                      id="anamnesis_life"
                      label="Анамнез в течение жизни:"
                      v-model="appointment.disease_anamnesis"
                    />

                    <!-- Анамнез в течение болезни -->
                    <ResizableTextarea
                      id="anamnesis_illness"
                      v-model="appointment.life_anamnesis"
                      label="Анамнез в течение болезни:"
                    />

                    <!-- Данные по ЭхоКТ -->
                    <ResizableTextarea
                      id="EKG_data"
                      v-model="appointment.echocardiogram_data"
                      label="Данные по ЭхоКТ:"
                      class="col-span-2"
                    />
                  </div>
                  <div>
                    <AorticComponent
                      :is-aortic-uploaded="!!appointment.file_hash"
                      :appointment_id="appointment.appointment_id"
                      :examination="examination"
                      :slices_num="appointment.slices_num"
                    />
                  </div>
                  <div>
                    <div class="flex justify-end items-center">
                      <button
                        type="button"
                        @click.prevent="handleUpdateSingleAppointment(appointment)"
                        class="ad-primary-btn"
                      >
                        Сохранить
                      </button>
                    </div>
                  </div>
                </div>
              </details>
            </div>
            <form
              @submit.prevent="handleSubmitAppointment"
              class="mb-4 border p-6 bg-white rounded-2xl group relative"
            >
              <details class="group">
                <summary
                  class="cursor-pointer flex justify-between items-center group-hover:text-theme-primary0"
                >
                  <span>Новый прием</span>
                  <HeroIcon icon-type="outline" icon-name="PlusCircleIcon" class="h-5 w-5" />
                </summary>
                <div class="space-y-4 py-5">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <!-- Кровяное давление -->
                    <div>
                      <label for="blood_pressure" class="block mb-2 text-sm text-gray-900"
                        >Кровяное давление:</label
                      >
                      <input
                        v-model="newAppointment.blood_pressure"
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
                        v-model="newAppointment.pulse"
                        id="height"
                        class="ad-input"
                        min="0"
                        max="250"
                      />
                    </div>

                    <!-- Отечность -->
                    <div>
                      <label for="swelling" class="block mb-2 text-sm text-gray-900"
                        >Отечность:</label
                      >
                      <input
                        v-model="newAppointment.swell"
                        type="text"
                        id="swelling"
                        class="ad-input"
                      />
                    </div>
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <!-- Жалобы -->
                    <ResizableTextarea
                      id="complaints"
                      label="Жалобы:"
                      v-model="newAppointment.complains"
                    />

                    <!-- Диагноз -->
                    <ResizableTextarea
                      id="diagnosis"
                      label="Диагноз:"
                      v-model="newAppointment.diagnosis"
                    />

                    <!-- Осложнения -->
                    <ResizableTextarea
                      id="complications"
                      label="Осложнения:"
                      v-model="newAppointment.disease_complications"
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
                      v-model="newAppointment.disease_anamnesis"
                    />

                    <!-- Анамнез в течение болезни -->
                    <ResizableTextarea
                      id="anamnesis_illness"
                      v-model="newAppointment.life_anamnesis"
                      label="Анамнез в течение болезни:"
                    />

                    <!-- Данные по ЭхоКТ -->
                    <ResizableTextarea
                      id="EKG_data"
                      v-model="newAppointment.echocardiogram_data"
                      label="Данные по ЭхоКТ:"
                    />
                  </div>
                </div>
                <div class="flex justify-end items-center">
                  <button type="submit" class="ad-primary-btn">Добавить прием</button>
                </div>
              </details>
            </form>
          </div>
        </div>
      </div>

      <div class="flex space-x-3 mt-6"></div>
    </div>
  </div>
</template>
