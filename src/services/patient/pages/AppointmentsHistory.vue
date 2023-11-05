<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { reactive } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRouter } from 'vue-router'

const patientsList = reactive([
  {
    id: 2,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran дизайна и композиции читаемый текст мешает сосредоточиться',
    sex: 'M',
    date: '10.10.2023',
    height:
      'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому',
    complaints:
      'что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
  },
  {
    id: 3,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran дизайна и композиции читаемый текст мешает сосредоточиться',
    sex: 'M',
    date: '10.10.2023',
    height:
      'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому',
    complaints:
      'что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
  },
  {
    id: 4,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran дизайна и композиции читаемый текст мешает сосредоточиться',
    sex: 'M',
    date: '10.10.2023',
    height:
      'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому',
    complaints:
      'что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
  },
  {
    id: 5,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran дизайна и композиции читаемый текст мешает сосредоточиться',
    sex: 'M',
    date: '10.10.2023',
    height:
      'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому',
    complaints:
      'что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
  },
])
const router = useRouter()

const handleOpenAppointment = (id) => {
  router.push({name: 'AppointmentHistory', params: {id: id}})
}
</script>

<template>
  <div class="overflow-x-auto">
    <PageHeaderComponent title="История приема" />
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 truncate"># ID</th>
          <th scope="col" class="px-6 py-3 truncate">Номер полиса ОМС</th>
          <th scope="col" class="px-6 py-3 truncate">ФИО</th>
          <th scope="col" class="px-6 py-3">Пол</th>
          <th scope="col" class="px-6 py-3 truncate">Дата приема</th>
          <th scope="col" class="px-6 py-3 truncate">Отечность</th>
          <th scope="col" class="px-6 py-3 truncate">Жалобы</th>
          <th class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="[&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-white">
        <tr v-for="patient in patientsList" :key="patient.id" @click="handleOpenAppointment(patient.id)" class="border-b hover:bg-gray-100 cursor-pointer">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ patient?.id }}
          </th>
          <td class="px-6 py-4 truncate">{{ patient?.OMC }}</td>
          <td class="px-6 py-4">
            <span class="line-clamp-1">{{ patient?.FIO }}</span>
          </td>
          <td class="px-6 py-4">{{ patient?.sex }}</td>
          <td class="px-6 py-4">{{ patient?.date }}</td>
          <td class="px-6 py-4">
            <span class="line-clamp-1">
              {{ patient?.height }}
            </span>
          </td>
          <td class="px-6 py-4">
            <span class="line-clamp-1">{{ patient?.complaints }}</span>
          </td>
          <td @click.stop.prevent>
            <button type="button">
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
</template>

<style scoped></style>
