<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength, email } from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import { validPassword } from '../utils/securityUtils'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/services/security/store'
import type { TUserRegisterForm } from '@/services/security/types/index'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import SecurityRequests from '@/services/security/requests'
import { handleError } from '@/utils/handleError'
import Notification from '@/utils/Notification'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()

const { loggedInStatus } = storeToRefs(userStore)
const isLoading = ref(false)

const registerForm = reactive<TUserRegisterForm>({
  first_name: null,
  second_name: null,
  email: null,
  role: null,
  password: null
})


const rules = computed(() => ({
  registerForm: {
    first_name: {
      required: helpers.withMessage('Имя - это обязательное поле', required),
      minLength: helpers.withMessage('Длина не менее 2 символов', minLength(2))
    },
    second_name: {
      required: helpers.withMessage('Фамилия - это обязательное поле', required),
      minLength: helpers.withMessage('Длина не менее 2 символов', minLength(2))
    },
    role: {
      required: helpers.withMessage('Роль - это обязательное поле', required)
    },
    email: {
      required: helpers.withMessage('Email - это обязательное поле', required),
      email: helpers.withMessage('Некорректный email', email)
    },
    password: {
      required: helpers.withMessage('Пароль - это обязательное поле', required),
      name_validation: {
        $validator: validPassword,
        $message:
          'Как минимум один специальный символ, например: ! @ # ?, одна цифра(0-9) и отсутствие пробелов'
      },
      minLength: helpers.withMessage('Длина не менее 5 символов', minLength(5))
    }
  }
}))

const v$ = useVuelidate(rules, { registerForm })

onMounted(() => {
  if (loggedInStatus.value) {
    router.push({ name: 'Dashboard' })
  }
})

async function handleRegister() {
  v$.value.$touch()

  if (!v$.value.$error) {
    isLoading.value = true
    try {
      await Notification.promise(SecurityRequests.registration(registerForm), true)
      await router.push({ name: 'LoginPage' })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Notification.error(error.response.data?.detail)
      }
      throw e;
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <main class="overflow-hidden login-container">
    <div class="max-w-screen-2xl mx-auto flex justify-between">
      <div class="inner-bg hidden sm:flex"></div>
      <div
        class="flex flex-col justify-between p-6 2xl:rounded-md bg-white 2xl:overflow-hidden h-screen overflow-y-auto w-full lg:w-[700px]"
      >
        <div>
          <div class="text-center">
            <router-link to="/" class="text-black logo text-4xl">Регистрация </router-link>
            <p class="py-4 text-gray-400">Пожалуйста, заполните следующие поля</p>
          </div>
          <div class="w-full px-4 sm:px-8">
            <form
              @submit.prevent="handleRegister"
              class="flex flex-col space-y-8"
              autocomplete="off"
            >
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900"
                    >Имя</label
                  >
                  <input
                    v-model="v$.registerForm.first_name.$model"
                    type="text"
                    id="first_name"
                    class="ad-input"
                    placeholder=""
                  />
                  <ErrorComponent :errors="v$.registerForm.first_name.$errors" />
                </div>
                <div>
                  <label for="second_name" class="block mb-2 text-sm font-medium text-gray-900"
                    >Фамилия</label
                  >
                  <input
                    v-model="v$.registerForm.second_name.$model"
                    type="text"
                    id="second_name"
                    class="ad-input"
                    placeholder=""
                  />
                  <ErrorComponent :errors="v$.registerForm.second_name.$errors" />
                </div>
                <div>
                  <label for="role" class="block mb-2 text-sm font-medium text-gray-900"
                    >Роль</label
                  >
                  <select
                    id="role"
                    name="role"
                    v-model="v$.registerForm.role.$model"
                    class="ad-input"
                  >
                    <option value="cardiosurgeon">Кардиохирург</option>
                    <option value="CT_specialist">КТ Специалист</option>
                  </select>
                  <ErrorComponent :errors="v$.registerForm.role.$errors" />
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                    >Email</label
                  >
                  <input
                    v-model="v$.registerForm.email.$model"
                    type="email"
                    id="email"
                    class="ad-input"
                    placeholder="test"
                  />
                  <ErrorComponent :errors="v$.registerForm.email.$errors" />
                </div>
                <div class="">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                    >Пароль</label
                  >
                  <input
                    v-model="v$.registerForm.password.$model"
                    type="password"
                    id="password"
                    class="ad-input"
                    placeholder="........"
                  />
                  <ErrorComponent :errors="v$.registerForm.password.$errors" />
                </div>
              </div>
              <div class="">
                <button type="submit" class="ad-primary-btn w-full">
                  {{ isLoading ? 'Обрабатывается...' : 'Зарегистрироваться' }}
                </button>
              </div>
              <div class="text-sm font-light text-gray-500 mt-4 justify-center space-x-4 flex">
                <p>Уже есть аккаунт?</p>
                <router-link
                  :to="{ name: 'LoginPage' }"
                  class="font-medium text-primary-600 hover:underline"
                  >Войти</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
