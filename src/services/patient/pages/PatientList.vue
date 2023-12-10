<script setup lang='ts'>
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { onMounted } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '@/services/patient/store'
import { storeToRefs } from 'pinia'
import Loading from '@/components/Looading.vue'
import NoData from '@/components/NoData.vue'

const router = useRouter()
const store = usePatientStore()
const { patientsList, isLoading  } = storeToRefs(store)

onMounted(async () => {
  await store.getPatientsList(1)
})
</script>

<template>
  <div class="overflow-x-auto">
    <div>
      <Loading v-if="isLoading" />
      <div v-else>
        <div>
          <div v-if="patientsList && patientsList?.length > 0 ">
            <PageHeaderComponent title="Список пациентов" />
            <table
              class="w-full text-sm text-left text-gray-500 mt-4"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 truncate">Номер полиса ОМС</th>
                <th scope="col" class="px-6 py-3 truncate">Фамилия Имя Отчество</th>
                <th scope="col" class="px-6 py-3">Пол</th>
                <th scope="col" class="px-6 py-3 truncate">Дата Рождения</th>
                <th scope="col" class="px-6 py-3 truncate">Рост (в см)</th>
                <th scope="col" class="px-6 py-3 truncate">Вес (в кг)</th>
              </tr>
              </thead>
              <tbody class="[&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-white">
                <tr
                  v-for="patient in patientsList"
                  :key="patient?.patient_id"
                  class="border-b hover:bg-gray-100 "
                >
                <td class="px-6 py-4  truncate">  {{ patient?.patient_id }} </td>
                <td class="px-6 py-4 truncate">  {{ patient?.full_name }} </td>
                <td class="px-6 py-4">  {{ patient?.is_male ? "М" : "Ж"}} </td>
                <td class="px-6 py-4">  {{ patient?.birth_date }} </td>
                <td class="px-6 py-4">  {{ patient?.height }} </td>
                <td class="px-6 py-4">  {{ patient?.weight }} </td>
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

<style scoped>

</style>