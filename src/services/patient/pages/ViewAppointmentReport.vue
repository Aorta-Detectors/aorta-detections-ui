<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, reactive } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute } from 'vue-router'
import ResizableTextarea from '@/components/ResizableTextarea.vue'

const appointment = reactive({
  id: 2,
  OMC: '0000 0000 0000 0000',
  FIO: ' Gondran дизайна и композиции читаемый текст мешает сосредоточиться',
  sex: 'M',
  date: '10.10.2023',
  height:
    'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому',
  complaints:
    'что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
})

const selectedImageIds = reactive([])

const patientForm = reactive({
  OMC: null,
  FIO: null,

  sex: null,
  birth_date: null,
  height: null,
  weight: null,

  blood_pressure: null,
  pulse: null,
  swelling: null,

  complaints: null,
  diagnosis: null,
  complications: null,
  accompanying_illnesses: null,

  anamnesis_life: null,
  anamnesis_illness: null,
  EKG_data: null
})

const route = useRoute()

const id = computed(() => route?.params?.id)

function handleDateSelection(date) {
  console.log(date)
}

function handleUpdateAppointment() {}
</script>

<template>
  <div class="overflow-x-auto">
    <PageHeaderComponent :title="`Отчет №${id} от 10.10.2023`" description="Врач Pama Gondran">
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
        <div class="w-full mt-10 border p-6 bg-white h-[20rem]">
          <h2>Report Details</h2>
        </div>
        <div class="w-full mt-10 border p-6 bg-white h-[20rem]">
          <h2>Patient information</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-4">
        <div class="bg-white lg:col-span-3 border p-4">
          <div class="flex justify-between w-full pb-2">
            <h2 class="">Aorta Segmentation</h2>
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
          <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            <div
              v-for="(img, index) in 9"
              :key="index"
              class="relative group h-[12rem] w-full bg-white shadow p-1"
            >
              <span class="absolute text-xs left-4 bottom-4 bg-white w-5 h-5 flex justify-center items-center rounded-full flex-shrink-0">{{index+1}}</span>
              <div class="absolute right-4 top-4 group-hover:flex">
                <input
                  :id="index"
                  type="checkbox"
                  v-model="selectedImageIds"
                  :value="index"
                  class="accent-theme-primary0 z-10 w-6 h-6"
                />
              </div>
              <label :for="index">
                <img
                  class="h-full max-w-full w-full object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1J6q6gTxhkpucX2Vw6QqITvYk2UPs-weH2aLZKKY1AH1tSp8-oqZ2_MZsW2HT7wUDk4&usqp=CAU"
                  alt="aortic"
                />
                <span
                  class="absolute inset-x-0 bottom-0 h-16 2xl:h-36 transition-all duration-200 bg-gradient-to-t group-hover:flex hidden from-theme-base-bg opacity-40"
                />
              </label>
            </div>
          </div>
        </div>
       <div class="w-full lg:col-span-2 h-full ">
         <div class="grid grid-cols-1 gap-4 h-full">
           <div class="w-full col-span-2 border p-6 bg-white">
             <h2>Aortic Valve</h2>
           </div>
           <div class="w-full col-span-2 h-full border p-6 bg-white">
             <h2>Measurements</h2>
           </div>
         </div>
       </div>
      </div>

      <div class="mt-8">
        <ResizableTextarea id="conclusion" label="Заключение"   />


        <div class="flex justify-between items-center mt-4">
          <div >
            <label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900"
            >Результаты согласуются ?</label
            >
            <div class="flex space-x-4 ">
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
            class=" text-white bg-theme-primary0 font-medium rounded-md text-xl px-5 py-3 mr-2 focus:outline-none flex space-x-2   outline-none"
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

<style scoped></style>
