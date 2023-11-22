<script setup lang="ts">
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import { computed, reactive } from 'vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useRoute } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'
import ResizableTextarea from '@/components/ResizableTextarea.vue'
import ErrorComponent from '@/components/common/ErrorComponent.vue'

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
    <PageHeaderComponent :title="`Обследования №${id} от 10.10.2023`" >
      <router-link :to="{name: 'ViewAppointmentReport', params: {id: id}}"  class="flex space-x-2 px-2 py-2 rounded-md bg-white border hover:bg-gray-50 outline-none">
        <HeroIcon icon-type="outline" icon-name="DocumentChartBarIcon" class="block h-6 w-6" aria-hidden="true"/>
        <span>Посмотреть отчет</span>
      </router-link>
    </PageHeaderComponent>

    <div class="mt-8">
      <div class="w-full mt-10 border p-6 bg-white rounded-2xl">
        <form
          @submit.prevent="handleUpdateAppointment"
          class="flex flex-col space-y-8"
          autocomplete="off"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Полис -->
            <div>
              <label for="OMC" class="block mb-2 text-sm text-gray-900">Номер полиса ОМС:</label>
              <input
                v-model="patientForm.OMC"
                type="text"
                id="OMC"
                class="ad-input"
                placeholder=""
              />
            </div>

            <!-- ФИО -->
            <div>
              <label for="FIO" class="block mb-2 text-sm text-gray-900"
                >Фамилия Имя Отчество:</label
              >
              <input
                v-model="patientForm.FIO"
                type="text"
                id="FIO"
                class="ad-input"
                placeholder=""
              />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <!-- Пол -->
              <div>
                <label for="sex" class="block mb-2 text-sm text-gray-900">Пол:</label>
                <select id="sex" name="sex" v-model="patientForm.sex" class="ad-input">
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </select>
              </div>

              <!-- Рост -->
              <div>
                <label for="height" class="block mb-2 text-sm text-gray-900">Рост (в см):</label>
                <input
                  v-model="patientForm.height"
                  type="number"
                  id="height"
                  class="ad-input"
                  min="0"
                  max="300"
                />
              </div>

              <!-- Вес -->
              <div>
                <label for="weight" class="block mb-2 text-sm text-gray-900">Вес (в кг):</label>
                <input
                  v-model="patientForm.weight"
                  type="number"
                  id="weight"
                  class="ad-input"
                  min="0"
                  max="700"
                  step="0.1"
                />
              </div>
            </div>
            <!-- Дата Рождения -->
            <div>
              <label for="birth_date" class="block mb-2 text-sm text-gray-900"
                >Дата Рождения:</label
              >
              <VueDatePicker
                @update:model-value="handleDateSelection"
                v-model="patientForm.birth_date"
                locale="ru-Ru"
                format="dd/MM/yyyy"
                cancelText="Отменить"
                selectText="Выбрать"
                id="birth_date"
                class="py-1.5"
                text-input
                :enable-time-picker="false"
                :action-row="{ showNow: true }"
                now-button-label="Сегодня"
              />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <!-- Кровяное давление -->
              <div>
                <label for="blood_pressure" class="block mb-2 text-sm text-gray-900"
                  >Кровяное давление:</label
                >
                <input
                  v-model="patientForm.blood_pressure"
                  type="text"
                  id="blood_pressure"
                  class="ad-input"
                />
              </div>

              <!-- Пульс -->
              <div>
                <label for="height" class="block mb-2 text-sm text-gray-900">Пульс:</label>
                <input
                  v-model="patientForm.pulse"
                  type="number"
                  id="height"
                  class="ad-input"
                  min="0"
                  max="250"
                />
              </div>
            </div>

            <!-- Отечность -->
            <div>
              <label for="swelling" class="block mb-2 text-sm text-gray-900">Отечность:</label>
              <input v-model="patientForm.swelling" type="text" id="swelling" class="ad-input" />
            </div>

            <!-- Жалобы -->
            <ResizableTextarea id="complaints" label="Жалобы:" v-model="patientForm.complaints" />

            <!-- Диагноз -->
            <ResizableTextarea id="diagnosis" label="Диагноз:" v-model="patientForm.diagnosis" />

            <!-- Осложнения -->
            <ResizableTextarea
              id="complications"
              label="Осложнения:"
              v-model="patientForm.complications"
            />

            <!-- Сопуствующие заболевания -->
            <ResizableTextarea
              id="accompanying_illnesses"
              label="Сопуствующие заболевания:"
              v-model="patientForm.accompanying_illnesses"
            />

            <!-- Анамнез в течение жизни -->
            <ResizableTextarea
              id="anamnesis_life"
              label="Анамнез в течение жизни:"
              v-model="patientForm.anamnesis_life"
            />

            <!-- Анамнез в течение болезни -->
            <ResizableTextarea
              id="anamnesis_illness"
              label="Анамнез в течение болезни:"
              v-model="patientForm.anamnesis_illness"
            />

            <!-- Данные по ЭхоКТ -->
            <ResizableTextarea
              id="EKG_data"
              label="Данные по ЭхоКТ:"
              v-model="patientForm.EKG_data"
            />
            <div class="flex justify-end items-center">
              <router-link :to="{ name: 'AppointmentsHistory' }" class="mr-4">Отменить</router-link>
              <button type="submit" class="ad-primary-btn">Сохранить</button>
            </div>
          </div>
        </form>
      </div>

      <div class="flex space-x-3 mt-6">
        <form
          @submit.prevent
          class="bg-white col-span-2 text-gray-300 group border hover:border-2 duration-300 hover:cursor-pointer transition-all relative border-dashed border-theme-primary0 h-[400px] rounded-xl flex justify-center items-center w-full"
        >
          <div class="flex items-center justify-center flex-col space-y-2 group-hover:text-theme-primary10">
            <HeroIcon icon-type="outline" icon-name="ArrowUpTrayIcon" />
            <span>Загрузить файлы</span>
          </div>

          <button
            type="submit"
            class="absolute bottom-2 right-2 bg-theme-primary10 hover:bg-theme-primary20 text-white px-4 py-2 rounded-tl-xl rounded-br-xl"
          >
            Сохранить
          </button>
        </form>
        <div class="lg:block hidden w-[400px] border p-6 bg-white rounded-xl">
          <ol class="relative text-gray-500 border-l ml-4 border-gray-200">
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-theme-primary60"
              >
                <HeroIcon icon-type="outline" icon-name="ArrowPathIcon" class="animate-spin" />
              </span>
              <h3 class="leading-tight">Pre Processing</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="my-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                2
              </span>
              <h3 class="leading-tight">Aortic Segmentation</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                3
              </span>
              <h3 class="leading-tight">Segmentation Networks</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                4
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="mb-5 ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                5
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
            <li class="ml-8">
              <span
                class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30"
              >
                6
              </span>
              <h3 class="leading-tight">Performance Metrics</h3>
              <p class="text-xs">Step details here</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
