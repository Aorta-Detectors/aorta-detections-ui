<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, reactive, ref, onMounted, watch } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute } from 'vue-router'
import ResizableTextarea from '@/components/ResizableTextarea.vue'
import { usePatientStore } from '@/services/patient/store'
import { storeToRefs } from 'pinia'
import AorticRowDetails from '@/services/patient/parials/AorticRowDetails.vue'
import InfoRequests from '@/services/patient/requests'
import GalleryComponent from '@/services/patient/parials/GalleryComponent.vue'
import GalleryItemComponent from '@/services/patient/parials/GalleryItemComponent.vue'

const route = useRoute()
let images = reactive([])

const id = computed(() => route?.params?.id)
const appointment_id = computed(() => route?.params?.appointment_id)
const OMCnumber = computed(() => route?.query?.OMCnumber)
let isUploading = ref(false)
const options = reactive({
  Carousel: {
    infinite: false
  }
})

const store = usePatientStore()

const { appointmentGet, patientGet } = storeToRefs(store)
onMounted(async () => {
  isUploading.value = true // TODO: use it for loading state
  /*
   * TODO: create an action for this logic
   * */
  const slices_num = route?.query?.slices_num
  const series_id = route?.query?.series_id
  const queries = []
  const generateParams = (form) => new URLSearchParams(form)
  if (slices_num && series_id) {
    for (let i = 1; i <= +slices_num; i++) {
      queries.push(
        generateParams({
          slice_num: i,
          series_id: +series_id,
          appointment_id: appointment_id.value
        }).toString()
      )
    }

    if (queries.length) {
      await Promise.all(
        Object.values(queries).map(async (param) => {
          const { data } = await InfoRequests.get_slice(param)

          if ('file' in data) {
            images.push(data.file)
          }
        })
      )
        .then((response) => {
          isUploading.value = false
        })
        .catch(() => {
          isUploading.value = false
        })
    }
  }

  if (appointment_id.value) {
    await store.getAppointment(appointment_id.value)
  }
  if (OMCnumber.value) {
    await store.getPatient(OMCnumber.value)
  }
})

let appointmentForm = reactive({
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
  is_ready: null,
  appointment_id: null,
  doctor_name: null
})

let patientForm = reactive({
  patient_id: null,
  full_name: null,
  birth_date: null,
  is_male: null,
  height: null,
  weight: null
})

watch(
  () => appointmentGet.value,
  (newAppointment) => {
    if (newAppointment) {
      appointmentForm = JSON.parse(JSON.stringify(newAppointment))
      appointmentForm.appointment_time = new Date(
        appointmentForm.appointment_time
      ).toLocaleDateString()
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => patientGet.value,
  (newPatient) => {
    if (newPatient) {
      patientForm = JSON.parse(JSON.stringify(newPatient))
    }
  },
  { immediate: true, deep: true }
)

const content = ref(null)

const aorticDetails = [
  {
    label: 'Кровяное давление',
    key: 'blood_pressure'
  },
  {
    label: 'Пульс',
    key: 'pulse'
  },
  {
    label: 'Отечность',
    key: 'swell'
  },
  {
    label: 'Жалобы',
    key: 'complains'
  },
  {
    label: 'Осложнения',
    key: 'disease_complications'
  },
  {
    label: 'Сопуствующие заболевания',
    key: 'comorbidities'
  }
]

function getSliceInfo(id){
  /*
  * TODO: use id to fetch details
  * */
  console.log(id)
}

</script>

<template>
  <div v-if="appointmentGet && patientGet" class="overflow-x-auto" ref="content">
    <PageHeaderComponent
      :title="`Отчет №${appointment_id} от ${appointmentForm.appointment_time}`"
      :description="`Врач ${appointmentForm.doctor_name}`"
    >
      <div class="flex space-x-4">
        <button
          type="button"
          id="print-list"
          class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none"
        >
          <HeroIcon
            icon-type="outline"
            icon-name="PencilSquareIcon"
            class="block h-6 w-6"
            aria-hidden="true"
          />
          <span>Редактировать</span>
        </button>
        <button
          type="button"
          id="print-list"
          class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none"
        >
          <HeroIcon
            icon-type="outline"
            icon-name="PrinterIcon"
            class="block h-6 w-6"
            aria-hidden="true"
          />
          <span>Экспорт</span>
        </button>
      </div>
    </PageHeaderComponent>

    <div class="">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="w-full mt-10 border p-6 bg-white h-[14rem]">
          <h2 class="text-gray-400 text-xl">Диагноз</h2>

          <div class="text-black mt-6">
            {{ appointmentForm.diagnosis }}
          </div>
        </div>
        <div class="w-full mt-10 border p-6 bg-white h-[14rem]">
          <h2 class="text-gray-400 text-xl">Информация о пациенте</h2>
          <div class="mt-2">
            <ul class="space-y-1 list-inside">
              <li class="font-bold text-2xl">
                {{ patientForm.full_name }}
              </li>
              <li>
                {{ 'Дата рождения: ' + patientForm.birth_date }}
              </li>
              <li>
                {{ 'Рост: ' + patientForm.height }}
              </li>
              <li>
                {{ 'Вес: ' + patientForm.weight }}
              </li>
              <li>
                {{ patientForm.is_male ? 'Мужчина' : 'Женщина' }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-4">
        <div class="bg-white lg:col-span-3 border p-4">
          <div class="flex justify-between w-full pb-2">
            <h2 class="">Сегментация аорты</h2>
            <div class="flex space-x-2">
              <button class="shadow p-1">
                <HeroIcon
                  icon-type="outline"
                  icon-name="BarsArrowDownIcon"
                  class="block h-4 w-6"
                  aria-hidden="true"
                />
              </button>
              <div>
                <button class="shadow p-1">
                  <HeroIcon
                    icon-type="outline"
                    icon-name="ChevronLeftIcon"
                    class="block h-4 w-6"
                    aria-hidden="true"
                  />
                </button>
                <button class="shadow p-1">
                  <HeroIcon
                    icon-type="outline"
                    icon-name="ChevronRightIcon"
                    class="block h-4 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div>
            <GalleryComponent
              v-if="images && images.length"
              :options="options"
              class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3"
            >
              <GalleryItemComponent
                v-for="(img, index) in images"
                :key="index"
                @onGetSliceInfo="getSliceInfo"
                :id="index"
                :src="img"
                alt="aortic segment"
              />
            </GalleryComponent>
          </div>
        </div>
        <div class="w-full lg:col-span-2 h-full">
          <div class="grid grid-cols-1 gap-4 h-full">
            <div class="w-full col-span-2 border p-6 bg-white">
              <h2 class="text-gray-400 text-xl">Данные</h2>

              <div class="mt-6">
                <ul class="space-y-1 list-disc list-inside">
                  <AorticRowDetails
                    v-for="inf in aorticDetails"
                    :label="inf.label"
                    :label-key="inf.key"
                    :key="inf.key"
                    :appointment-form="appointmentForm"
                  />
                </ul>
              </div>
            </div>
            <div
              v-if="appointmentForm.echocardiogram_data !== null"
              class="w-full col-span-2 h-full border p-6 bg-white"
            >
              <h2>Данные ЭХОКГ</h2>

              <div class="mt-6">
                <ul class="space-y-1 list-disc list-inside">
                  <li class="">
                    {{ appointmentForm.echocardiogram_data }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <ResizableTextarea id="conclusion" label="Заключение" />
        <div class="flex justify-between items-center mt-4">
          <div>
            <label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900"
              >Результаты согласуются ?</label
            >
            <div class="flex space-x-4">
              <button
                type="button"
                id="print-list"
                class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none"
              >
                <HeroIcon
                  icon-type="outline"
                  icon-name="HandThumbUpIcon"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <span>Да</span>
              </button>
              <button
                type="button"
                id="print-list"
                class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none"
              >
                <HeroIcon
                  icon-type="outline"
                  icon-name="HandThumbDownIcon"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <span>Нет</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            id="print-list"
            class="text-white bg-theme-primary0 font-medium rounded-md text-xl px-5 py-3 mr-2 focus:outline-none flex space-x-2 outline-none"
          >
            <HeroIcon
              icon-type="outline"
              icon-name="PrinterIcon"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <span>Экспорт</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
