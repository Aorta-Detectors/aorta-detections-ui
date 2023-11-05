<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, numeric, email } from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import ResizableTextarea from '../../../components/ResizableTextarea.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
export default {
  name: 'AddPatient',
  components: { PageHeaderComponent, ErrorComponent, ResizableTextarea, VueDatePicker },

  data() {
    return {
      v$: useVuelidate(),

      patientForm: {
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
      }
    }
  },

  computed: {

  },

  methods: {
    handleDateSelection(date) {
      console.log(date)
    },

    handleAddPatient() {
      this.v$.patientForm.$touch()
      if (!this.v$.patientForm.$error) {
      }
    }
  },

  validations() {
    return {
      patientForm: {
        OMC: {
          required: helpers.withMessage('Это обязательное поле', required),
          numeric: helpers.withMessage('Допускаются только цифры', numeric)
          // is_16_digits: helpers.regex(/^\d{16}$/),
        },
        FIO: {
          required: helpers.withMessage('Это обязательное поле', required)
          // words_3: helpers.regex(/^/),
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="">
      <PageHeaderComponent title="Оформление нового приема" />
      <p class="py-4 text-gray-400">Пожалуйста, заполните следующие поля</p>
    </div>

    <div class="w-full">
      <form @submit.prevent="handleAddPatient" class="flex flex-col space-y-8" autocomplete="off">
        <div class="grid grid-cols-1 lg:grid-cols-2  gap-4">
          <!-- Полис -->
          <div>
            <label for="OMC" class="block mb-2 text-sm font-medium text-gray-900"
              >Номер полиса ОМС:</label
            >
            <input
              v-model="v$.patientForm.OMC.$model"
              type="text"
              id="OMC"
              class="ad-input"
              placeholder=""
            />
            <ErrorComponent :errors="v$.patientForm.OMC.$errors" />
          </div>

          <!-- ФИО -->
          <div>
            <label for="FIO" class="block mb-2 text-sm font-medium text-gray-900"
              >Фамилия Имя Отчество:</label
            >
            <input
              v-model="v$.patientForm.FIO.$model"
              type="text"
              id="FIO"
              class="ad-input"
              placeholder=""
            />
            <ErrorComponent :errors="v$.patientForm.FIO.$errors" />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <!-- Пол -->
            <div>
              <label for="sex" class="block mb-2 text-sm font-medium text-gray-900">Пол:</label>
              <select id="sex" name="sex" v-model="patientForm.sex" class="ad-input">
                <option value="male">Мужчина</option>
                <option value="female">Женщина</option>
              </select>
            </div>

            <!-- Рост -->
            <div>
              <label for="height" class="block mb-2 text-sm font-medium text-gray-900"
                >Рост (в см):</label
              >
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
              <label for="weight" class="block mb-2 text-sm font-medium text-gray-900"
                >Вес (в кг):</label
              >
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
            <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900"
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
              :action-row="{ showNow: true }" now-button-label="Сегодня"
            />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <!-- Кровяное давление -->
            <div>
              <label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900"
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
              <label for="height" class="block mb-2 text-sm font-medium text-gray-900"
                >Пульс:</label
              >
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
            <label for="swelling" class="block mb-2 text-sm font-medium text-gray-900"
              >Отечность:</label
            >
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
          <ResizableTextarea id="EKG_data" label="Данные по ЭхоКТ:" v-model="patientForm.EKG_data" />
          <div class="flex justify-end items-center">
            <router-link :to="{ name: 'PatientsHistory' }" class="mr-4">Отменить</router-link>
            <button type="submit" class="ad-primary-btn">Добавить</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>
