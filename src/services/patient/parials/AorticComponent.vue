<script setup lang="ts">
import UploadMedia from '@/services/patient/parials/UploadMedia.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import InfoRequests from '@/services/patient/requests'
import SegmentationSteps from '@/services/patient/parials/SegmentationSteps.vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
const props = defineProps({
  appointment_id: {
    type: [String, Number],
    required: true
  },
  isAorticUploaded: {
    type: Boolean,
    required: true
  }
})

let statuses = reactive([])
const intervalId = ref(null)

onMounted(() => {
  //pullStatus()
})

function pullStatus(){
  if (props.appointment_id && statuses.length) {
    intervalId.value = setInterval(() => {
      handleGetAppointmentStatus(props.appointment_id)
    }, 30000)
  }
}

let isOpen = ref(false)
let isFetchingStatus = ref(false)


async function handleGetAppointmentStatus(id) {
  isFetchingStatus.value = true
  try {
    const { data, status } = await InfoRequests.get_status(id)
    statuses = data?.serieses_statuses
    isOpen.value = true
  } catch (e) {
    clearInterval(intervalId.value)
    throw e
  } finally {
    isFetchingStatus.value = false
  }
}

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <label class="block mb-2 font-medium text-gray-900">ЭхоКТ </label>
      <div class="text-green-600 text-sm inline-flex space-x-1.5">
        <HeroIcon
          :class="isFetchingStatus ? 'animate-spin' : ''"
          icon-type="outline"
          :icon-name="isFetchingStatus ? 'ArrowPathIcon' : 'CheckCircleIcon'"
        />
        <p class="first-letter:capitalize">аорты загружены</p>
      </div>
    </div>
    <UploadMedia
      v-if="!isAorticUploaded && !statuses.length"
      class="flex justify-center bg-gray-50 items-center w-full rounded-xl h-[14rem] 2xl:h-[12rem]"
      :appointment_id="props.appointment_id"
      @onUploadCompleted="handleGetAppointmentStatus(props.appointment_id)"
      api-url="info/add_file"
      :id='`${props.appointment_id}_zipFile`'
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

    <div class="grid grid-cols-3 gap-4">
      <div v-for="(stat, index) in statuses" :key="index">
        <h1 class="truncate p-2 bg-gray-100 rounded mb-4">съемка {{ index + 1 }}</h1>
        <SegmentationSteps :series_statuses="stat?.series_statuses" />
      </div>
    </div>
  </div>
</template>
