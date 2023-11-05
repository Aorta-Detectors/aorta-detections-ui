<script setup lang='ts'>
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { reactive } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'

const patientsList = reactive([
  {
    id: 1,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 2,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran ',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 3,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama Gondran',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 4,
    OMC: '0000 0000 0000 0000',
    FIO: 'Gondran Almega',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 1,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 2,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran ',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 3,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama Gondran',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 4,
    OMC: '0000 0000 0000 0000',
    FIO: 'Gondran Almega',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 1,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 2,
    OMC: '0000 0000 0000 0000',
    FIO: ' Gondran ',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 3,
    OMC: '0000 0000 0000 0000',
    FIO: 'Pama Gondran',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  },
  {
    id: 4,
    OMC: '0000 0000 0000 0000',
    FIO: 'Gondran Almega',
    sex: "M",
    birth_date: '10.10.1880',
    height: '170',
    weight: '70',
  }
])

</script>

<template>


  <div class='overflow-x-auto'>
    <PageHeaderComponent title='Список пациентов'/>
    <table class="w-full text-sm text-left text-gray-500 mt-4 ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3"># ID</th>
        <th scope="col" class="px-6 py-3 truncate">Номер полиса ОМС</th>
        <th scope="col" class="px-6 py-3 truncate">Фамилия Имя Отчество</th>
        <th scope="col" class="px-6 py-3">Пол</th>
        <th scope="col" class="px-6 py-3 truncate">Дата Рождения</th>
        <th scope="col" class="px-6 py-3 truncate">Рост (в см)</th>
        <th scope="col" class="px-6 py-3 truncate">Вес (в кг)</th>
        <th class="px-6 py-3"></th>
      </tr>
      </thead>
      <tbody class="[&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-white ">
      <tr
        v-for="patient in patientsList"
        :key="patient.id"
        class="border-b hover:bg-gray-100 "

      >
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{ patient?.id }}
        </th>
        <td class="px-6 py-4  truncate">  {{ patient?.OMC }} </td>
        <td class="px-6 py-4 truncate">  {{ patient?.FIO }} </td>
        <td class="px-6 py-4">  {{ patient?.sex }} </td>
        <td class="px-6 py-4">  {{ patient?.birth_date }} </td>
        <td class="px-6 py-4">  {{ patient?.height }} </td>
        <td class="px-6 py-4">  {{ patient?.weight }} </td>
        <td @click.stop.prevent>
          <button type="button" >
            <HeroIcon  icon-name='TrashIcon' class="h-5 w-5 text-red-500 outline-none hover:text-red-800"  icon-type='outline'/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>