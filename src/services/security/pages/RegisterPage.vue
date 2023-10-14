<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers, minLength, email} from '@vuelidate/validators'
import ErrorComponent from '../../../components/common/ErrorComponent.vue'
import { validPassword } from '../utils/securityUtils'
import LogoComponent from "@/components/common/LogoComponent.vue";
export default {
  name: 'RegisterPage',
  components: {LogoComponent, ErrorComponent },

  data() {
    return {
      v$: useVuelidate(),

      registerForm: {
        first_name: null,
        last_name: null,
        role: null,
        password: null
      }
    }
  },

  methods: {


    handleRegister() {
      this.v$.registerForm.$touch()
      if (!this.v$.registerForm.$error) {

      }
    }
  },

  validations() {
    return {
      registerForm: {
        first_name: {
          required: helpers.withMessage('First name is required', required),
          minLength: minLength(2)
        },
        last_name: {
          required: helpers.withMessage('Last name is required', required),
          minLength: minLength(2)
        },
        role: {
          required: helpers.withMessage('Role is required', required)
        },
        email: {
          required: helpers.withMessage('Email is required', required),
          email: helpers.withMessage("Invalid email", email),
        },
        password: {
          required: helpers.withMessage('Password is required', required),
          name_validation: {
            $validator: validPassword,
            $message:
              'At least one special character, e.g., ! @ # ?, on number(0-9) and no spaces'
          },
          minLength: helpers.withMessage('Длина не менее 5 символов', minLength(5))
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
          class="flex flex-col justify-between  p-6 2xl:rounded-md bg-white 2xl:overflow-hidden  h-screen  overflow-y-auto w-full lg:w-[700px]"
      >
        <div>
          <div class="text-center">
            <h1 class="text-black logo text-4xl">Registration</h1>
            <p class="py-4 text-gray-400">Please enter your credentials</p>
          </div>
          <div class="w-full  px-4 sm:px-8">
            <form @submit.prevent="handleRegister" class="flex flex-col space-y-8" autocomplete="off">
              <div class="grid grid-cols-1  gap-4">
                <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">First name</label>
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
                  <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                  <input
                      v-model="v$.registerForm.last_name.$model"
                      type="text"
                      id="last_name"
                      class="ad-input"
                      placeholder=""
                  />
                  <ErrorComponent :errors="v$.registerForm.last_name.$errors" />
                </div>
                <div>
                  <label for="role" class="block mb-2 text-sm font-medium text-gray-900"
                  >Role</label
                  >
                  <select id="role" name="role" v-model="v$.registerForm.role.$model" class="ad-input" >
                    <option value="cardiosurgeon">Cardiosurgeon</option>
                    <option value="CT_specialist">CT Specialist</option>
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
                  >Password</label
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
                <button type="submit" class="ad-primary-btn w-full">Register</button>
              </div>
              <div class="text-sm font-light text-gray-500 mt-4 justify-center space-x-4 flex">
                <p>Already have an account ?</p>
                <router-link
                    :to="{ name: 'LoginPage' }"
                    class="font-medium text-primary-600 hover:underline"
                >Login</router-link
                >
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  </main>
</template>
