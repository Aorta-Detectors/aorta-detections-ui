<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import LogoComponent from '@/components/common/LogoComponent.vue'
export default {
  name: 'LoginPage',
  components: { LogoComponent, ErrorComponent },

  data() {
    return {
      v$: useVuelidate(),

      loginForm: {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    loading() {
      return false
    }
  },

  methods: {
    login() {
      this.v$.loginForm.$touch()
      if (!this.v$.loginForm.$error) {
        //TODO: submit form
      }
    }
  },

  validations() {
    return {
      loginForm: {
        email: {
          required: helpers.withMessage('Email - это обязательное поле', required)
        },
        password: {
          required: helpers.withMessage('Пароль - это обязательное поле', required)
        }
      }
    }
  }
}
</script>

<template>
  <main class="overflow-hidden login-container">
    <div class="max-w-screen-2xl mx-auto flex justify-between">
      <div class="inner-bg hidden sm:flex"></div>
      <div
        class="flex flex-col justify-between 2xl:m-6 p-6 2xl:rounded-md bg-white overflow-hidden w-full lg:w-[700px]"
      >
        <div>
          <div class="my-10 text-center">
            <h1 class="text-black logo text-4xl">Добро пожаловать</h1>
            <p class="py-4 text-gray-400">Пожалуйста, введите логин и пароль</p>
          </div>
          <div class="w-full mt-10 px-4 sm:px-8">
            <form @submit.prevent="login" class="space-y-4 md:space-y-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                  >Email</label
                >
                <input
                  v-model="v$.loginForm.email.$model"
                  type="email"
                  id="email"
                  class="ad-input"
                  autocomplete="email"
                />
                <ErrorComponent :errors="v$.loginForm.email.$errors" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                  >Пароль</label
                >
                <input
                  v-model="v$.loginForm.password.$model"
                  type="password"
                  id="password"
                  class="ad-input"
                  autocomplete="current-password"
                />
                <ErrorComponent :errors="v$.loginForm.password.$errors" />
              </div>
              <div class="">
                <button type="submit" class="ad-primary-btn w-full">
                  {{ loading ? 'Загрузка...' : 'Войти' }}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="text-sm font-light text-gray-500 mt-4 justify-center space-x-4 flex">
          <p>Нет аккаунта?</p>
          <router-link
            :to="{ name: 'RegisterPage' }"
            class="font-medium text-primary-600 hover:underline"
            >Зарегестрироваться</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>


