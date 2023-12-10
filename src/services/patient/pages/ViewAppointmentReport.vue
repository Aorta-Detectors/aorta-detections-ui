<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, reactive, ref, onMounted, watch } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import ResizableTextarea from '@/components/ResizableTextarea.vue'
import jsPDF from 'jspdf';
import { usePatientStore } from '@/services/patient/store'
import { storeToRefs } from 'pinia'


const selectedImageIds = reactive([])


const route = useRoute()

const id = computed(() => route?.params?.id)
const appointment_id = computed(() => route?.params?.appointment_id)
const OMCnumber = computed(() => route?.query?.OMCnumber);

const store = usePatientStore()
const { appointmentGet, patientGet } = storeToRefs(store)

onMounted(async () => {
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
  weight: null,
})

watch(()=>appointmentGet.value, (newAppointment)=> {
  if(newAppointment){
    appointmentForm = JSON.parse(JSON.stringify(newAppointment))
    appointmentForm.appointment_time = new Date(appointmentForm.appointment_time).toLocaleDateString()
  }
}, {immediate: true, deep: true} )

watch(()=>patientGet.value, (newPatient)=> {
  if(newPatient){
    patientForm = JSON.parse(JSON.stringify(newPatient))
  }
}, {immediate: true, deep: true} )


const content = ref(null)
const initialCtY = 150
const ctData = [
  {
    y:initialCtY,
    value: 'Аортальный клапан трехстворчатый'
  },
  {
    y:initialCtY + 10,
    value: 'Диаметр ФК АК 24,2*33,5 мМ'
  },
  {
    y:initialCtY + 20,
    value: 'Диаметр синусов Вальсальвы 45,6*45,8 мм'
  },
  {
    y:initialCtY + 30,
    value: 'Диаметр тубулярной части вд 48,2*48,4 Мм'
  }
]

function addHeader(pdf) {
  pdf.setFontSize(20);
  pdf.text('Отчет', 20, 20);
  pdf.line(20, 25, 190, 25);
}



const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1J6q6gTxhkpucX2Vw6QqITvYk2UPs-weH2aLZKKY1AH1tSp8-oqZ2_MZsW2HT7wUDk4&usqp=CAU'
function generatePDF() {
  const pdf = new jsPDF();
  pdf.setFont('arial-unicode-ms.ttf', 'arial-unicode-ms', 'normal');
  addReportDetails(pdf);
  addPatientInfo(pdf);
  /*addDiagnosis(pdf);
  addCtData(pdf)
  addAorticValveMeasurements(pdf);
  addAorticImages(pdf);*/

  pdf.save('medical-report.pdf');
}

function addReportDetails(pdf) {
  pdf.setFontSize(18);
  pdf.text('Отчет', 20, 20);
  pdf.line(20, 25, 190, 25);
}

function addPatientInfo(pdf) {
  pdf.setFontSize(14);
  pdf.text('Информация о пациенте', 20, 40);
  pdf.text('ФИО: John Doe', 20, 50);
  pdf.text('Возраст: January 1, 1980', 20, 60);
  pdf.text('Пол: Male', 20, 70);
  pdf.text('Отчет №3 от 10.10.2023', 20, 80);
  pdf.text('№ обследования: 4111154552215222 ', 20, 100);
}
function addDiagnosis(pdf) {
  pdf.setFontSize(14);
  pdf.text('Диагноз', 20, 120);
  pdf.text('Дилатация восходящего отдела и аневризма брюшной аорты. Выраженная аортальная недостаточность', 20, 130);
}
function addCtData(pdf) {
  pdf.setFontSize(14);
  ctData.forEach(el => {
    pdf.text(el.value, 20, el.y);
  })
}


function addAorticValveMeasurements(pdf) {
  pdf.setFontSize(16);
  pdf.text('Данные КТ', 20, 200);
  pdf.text('Aortic Diameter: 3.2 cm', 20, 210);
  pdf.text('Aortic Valve Area: 2.0 cm²', 20, 220);
  pdf.text('Peak Aortic Velocity: 1.5 m/s', 20, 330);
}

function addAorticImages(pdf) {
  const aorticImage1 = img;
  const aorticImage2 = img;

  pdf.addImage(aorticImage1, 'JPEG', 20, 150, 80, 60);
  pdf.addImage(aorticImage2, 'JPEG', 110, 150, 80, 60);
}
</script>

<template>
  <div v-if="appointmentGet && patientGet" class="overflow-x-auto" ref='content' >
    <PageHeaderComponent :title="`Отчет №${appointment_id} от ${appointmentForm.appointment_time}`" :description="`Врач ${appointmentForm.doctor_name}`">
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
          @click.prevent='generatePDF'
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
          <h2 class='text-gray-400 text-xl'>Информация о пациенте</h2>
          <div class="mt-2">
            <ul class="space-y-1 list-inside">
              <li class="font-bold text-2xl">
                {{ patientForm.full_name }}
              </li>
              <li>
                {{ "Дата рождения: " + patientForm.birth_date }}
              </li>
              <li>
                {{ "Рост: " + patientForm.height }}
              </li>
              <li>
                {{ "Вес: " + patientForm.weight }}
              </li>
              <li>
                {{ patientForm.is_male ? "Мужчина" : "Женщина" }}
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
             <h2 class="text-gray-400 text-xl">Данные</h2>

             <div class="mt-6">
               <ul class="space-y-1 list-disc list-inside">
                 <li v-if="appointmentForm.blood_pressure !== null" class="">
                   {{ "Кровяное давление: " + appointmentForm.blood_pressure }}
                 </li>
                 <li v-if="appointmentForm.pulse !== null" class="">
                   {{ "Пульс: " + appointmentForm.pulse }}
                 </li>
                 <li v-if="appointmentForm.swell !== null" class="">
                   {{ "Отечность: " + appointmentForm.swell }}
                 </li>
                 <li v-if="appointmentForm.complains !== null" class="">
                   {{ "Жалобы: " + appointmentForm.complains }}
                 </li>
                 <li v-if="appointmentForm.disease_complications !== null" class="">
                   {{ "Осложнения: " + appointmentForm.disease_complications }}
                 </li>
                 <li v-if="appointmentForm.comorbidities !== null" class="">
                   {{ "Сопуствующие заболевания: " + appointmentForm.comorbidities }}
                 </li>
               </ul>
             </div>
           </div>
           <div v-if="appointmentForm.echocardiogram_data !== null" class="w-full col-span-2 h-full border p-6 bg-white">
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

<style scoped>

</style>
