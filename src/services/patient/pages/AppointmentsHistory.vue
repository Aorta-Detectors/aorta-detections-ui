<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { onMounted } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '@/services/patient/store'
import { storeToRefs } from 'pinia'
import Loading from '@/components/Looading.vue'
import NoData from '@/components/NoData.vue'
import { convertToLocalTime } from '@/utils/useLocalTimeConverter'

const router = useRouter()
const store = usePatientStore()
const { examinationsList, totalPages, isLoading, currentPage } = storeToRefs(store)

onMounted(async () => {
  await store.getExaminationsList(1)
})

const handleOpenAppointment = (id): void => {
  router.push({ name: 'AppointmentHistory', params: { id: id } })
}
</script>

<template>
  <div class="overflow-x-auto">
    <div>
      <Loading v-if="isLoading" />
      <div v-else>
        <div>
          <div v-if="examinationsList && examinationsList?.length > 0 ">
            <PageHeaderComponent title="История обследования" />
            <table
              class="w-full text-sm text-left text-gray-500 mt-4"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 truncate"># ID</th>
                <th scope="col" class="px-6 py-3 truncate">Номер полиса ОМС</th>
                <th scope="col" class="px-6 py-3 truncate">ФИО</th>
                <th scope="col" class="px-6 py-3 truncate">Дата</th>
                <th class="px-6 py-3"></th>
              </tr>
              </thead>
              <tbody class="[&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-white">
              <tr
                v-for="examination in examinationsList"
                :key="examination?.examination_id"
                class="border-b hover:bg-gray-100"
              >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ examination?.examination_id }}
                </th>
                <td class="px-6 py-4 truncate">{{ examination?.patient_id}}</td>
                <td class="px-6 py-4">
                  <span class="line-clamp-1">{{ examination?.patient_name }}</span>
                </td>
                <td class="px-6 py-4">{{ convertToLocalTime(examination?.last_appointment_time) }}</td>
                <td @click.stop.prevent>
                  <button @click="handleOpenAppointment(examination?.examination_id)" type="button">
                    <HeroIcon
                      icon-name="PencilSquareIcon"
                      class="h-5 w-5 text-green-500 outline-none hover:text-green-800"
                      icon-type="outline"
                    />
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <NoData v-else/>
        </div>
      </div>
    </div>
  </div>
</template>
