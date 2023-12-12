<script setup lang="ts">
import UploadMedia from '@/services/patient/parials/UploadMedia.vue'
import { reactive, ref } from 'vue'
import InfoRequests from '@/services/patient/requests'
import SegmentationSteps from '@/services/patient/parials/SegmentationSteps.vue'
import HeroIcon from '@/components/common/HeroIcon.vue'

const props = defineProps({
  appointment_id: {
    type: [String, Number],
    required: true
  },
  examination: {
    type: Object,
    required: () => {}
  },
  isAorticUploaded: {
    type: Boolean,
    required: true
  }
})

let statuses = reactive([])

let isOpen = ref(false)
let isFetchingStatus = ref(false)

async function handleGetAppointmentStatus(id) {
  isFetchingStatus.value = true
  if (props.isAorticUploaded) {
    try {
      const { data } = await InfoRequests.get_status(id)
      statuses = data?.serieses_statuses
      isOpen.value = true
    } catch (e) {
      throw e
    } finally {
      isFetchingStatus.value = false
    }
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <label class="block mb-2 font-medium text-gray-900">ЭхоКТ </label>
      <button
        type="button"
        @click.prevent="handleGetAppointmentStatus(props.appointment_id)"
        v-if="isAorticUploaded"
        class="text-sm inline-flex space-x-1.5"
      >
        <HeroIcon
          :class="{ 'animate-spin': isFetchingStatus }"
          icon-type="outline"
          icon-name="ArrowPathIcon"
        />
        <p class="first-letter:capitalize">
          {{ isFetchingStatus ? 'Обновляется...' : 'Обновить' }}
        </p>
      </button>
    </div>
    <UploadMedia
      v-if="!isAorticUploaded && !statuses.length"
      class="flex justify-center bg-gray-50 items-center w-full rounded-xl h-[14rem] 2xl:h-[12rem]"
      :appointment_id="props.appointment_id"
      @onUploadCompleted="handleGetAppointmentStatus(props.appointment_id)"
      api-url="info/add_file"
      :id="`${props.appointment_id}_zipFile`"
    />
    <div
      v-if="isAorticUploaded && !statuses.length && !isOpen"
      class="flex justify-center bg-gray-50 items-center w-full rounded-xl h-[14rem] 2xl:h-[12rem]"
    >
      <button
        @click.prevent="handleGetAppointmentStatus(props.appointment_id)"
        class="bg-black text-white bg-opacity-50 px-4 cursor-pointer py-2 inline-flex space-x-2 items-center leading-none rounded-full text-sm"
      >
        <span>{{ isFetchingStatus ? 'Загрузка...' : 'Посмотреть состояние аорты' }}</span>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div v-for="(stat, index) in statuses" :key="index" class="bg-gray-100 p-4 rounded-2xl">
        <div class="flex flex-row justify-between items-center mb-4">
          <h1 class="truncate capitalize text-gray-500 rounded">съемка {{ index + 1 }}</h1>
          <router-link
            v-if="examination"
            class="text-theme-primary0 transition-all duration-200 hover:text-white hover:bg-theme-primary0 text-sm rounded-xl px-4 py-2 bg-white"
            :to="{
              name: 'ViewAppointmentReport',
              params: { id: examination?.examination_id, appointment_id: props.appointment_id },
              query: {
                OMCnumber: examination?.patient?.patient_id,
                serieses_num: statuses.length,
                series_id: index,
                slices_num: stat?.slices_num
              }
            }"
            >Посмотреть</router-link
          >
        </div>
        <SegmentationSteps :series_statuses="stat?.series_statuses" />
      </div>
    </div>
  </div>
</template>
