<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers, numeric, email} from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import ResizableTextarea from '../../../components/ResizableTextarea.vue';
export default {
  name: 'AddPatient',
  components: {ErrorComponent, ResizableTextarea},

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
        EKG_data: null,
      }
    }
  },

  methods: {
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
          numeric: helpers.withMessage('Допускаются только цифры', numeric),
          // is_16_digits: helpers.regex(/^\d{16}$/),
        }, 
        FIO: {
          required: helpers.withMessage('Это обязательное поле', required),
          // words_3: helpers.regex(/^/),
        }
      }
    }
  }
}
</script>

<template>
<main class="overflow-hidden">
    <div class="max-w-screen-2xl mx-auto flex items-center justify-between">
      <div
          class="flex flex-col justify-between  p-6 rounded-x1 bg-white 2xl:overflow-hidden  h-screen  overflow-y-auto w-full lg:w-[700px] mx-auto my-auto"
      >
        <div>
          <div class="text-center">
            <h1 class="text-black logo text-4xl">Добавить нового пациента</h1>
            <p class="py-4 text-gray-400">Пожалуйста, заполните следующие поля</p>
          </div>
          
          <div class="w-full  px-4 sm:px-8">
            <form @submit.prevent="handleAddPatient" class="flex flex-col space-y-8" autocomplete="off">
              <div class="grid grid-cols-1  gap-4">

                <!-- Полис -->
                <div>
                  <label for="OMC" class="block mb-2 text-sm font-medium text-gray-900">Номер полиса ОМС:</label>
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
                  <label for="FIO" class="block mb-2 text-sm font-medium text-gray-900">Фамилия Имя Отчество:</label>
                  <input
                      v-model="v$.patientForm.FIO.$model"
                      type="text"
                      id="FIO"
                      class="ad-input"
                      placeholder=""
                  />
                  <ErrorComponent :errors="v$.patientForm.FIO.$errors" />
                </div>

                <!-- Пол -->
                <div>
                  <label for="sex" class="block mb-2 text-sm font-medium text-gray-900">Пол:</label>
                  <select id="sex" name="sex" v-model="patientForm.sex" class="ad-input" >
                    <option value="male">Мужчина</option>
                    <option value="female">Женщина</option>
                  </select>
                </div>
                
                <!-- Дата Рождения -->
                <div>
                  <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900">Дата Рождения:</label>
                  <input
                      v-model="patientForm.birth_date"
                      type="date"
                      id="birth_date"
                      class="ad-input"
                  />
                </div>

                <!-- Рост -->
                <div>
                  <label for="height" class="block mb-2 text-sm font-medium text-gray-900">Рост (в см):</label>
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
                  <label for="weight" class="block mb-2 text-sm font-medium text-gray-900">Вес (в кг):</label>
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

                <!-- Кровяное давление -->
                <div>
                  <label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900">Кровяное давление:</label>
                  <input
                      v-model="patientForm.blood_pressure"
                      type="text"
                      id="blood_pressure"
                      class="ad-input"
                  />
                </div>

                <!-- Пульс -->
                <div>
                  <label for="height" class="block mb-2 text-sm font-medium text-gray-900">Пульс:</label>
                  <input
                      v-model="patientForm.height"
                      type="number"
                      id="height"
                      class="ad-input"
                      min="0"
                      max="250"
                  />
                </div>

                <!-- Отечность -->
                <div>
                  <label for="swelling" class="block mb-2 text-sm font-medium text-gray-900">Отечность:</label>
                  <input
                      v-model="patientForm.swelling"
                      type="text"
                      id="swelling"
                      class="ad-input"
                  />
                </div>

                <!-- Жалобы -->
                <ResizableTextarea id="complaints" label="Жалобы:" model="patientForm.complaints"/>

                <!-- Диагноз -->
                <ResizableTextarea id="diagnosis" label="Диагноз:" model="patientForm.diagnosis"/>

                <!-- Осложнения -->
                <ResizableTextarea id="complications" label="Осложнения:" model="patientForm.complications"/>

                <!-- Сопуствующие заболевания -->
                <ResizableTextarea id="accompanying_illnesses" label="Сопуствующие заболевания:" model="patientForm.accompanying_illnesses"/>

                <!-- Анамнез в течение жизни -->
                <ResizableTextarea id="anamnesis_life" label="Анамнез в течение жизни:" model="patientForm.anamnesis_life"/>

                <!-- Анамнез в течение болезни -->
                <ResizableTextarea id="anamnesis_illness" label="Анамнез в течение болезни:" model="patientForm.anamnesis_illness"/>

                <!-- Данные по ЭхоКТ -->
                <ResizableTextarea id="EKG_data" label="Данные по ЭхоКТ:" model="patientForm.EKG_data"/>

              </div>
              <div class="">
                <button type="submit" class="ad-primary-btn w-full">Добавить</button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
</main>
</template>

<style scoped>

</style>