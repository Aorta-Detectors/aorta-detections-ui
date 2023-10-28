import { defineStore } from 'pinia'
import type { TUser, TUserLoginRequest } from '@/services/security/types'
import { handleError } from '@/utils/handleError'
import SecurityRequests from '@/services/security/requests'
import router from '@/router'

export type TUserState = { user: TUser; status: { loggedIn: boolean } }
const userTokens = JSON.parse(localStorage.getItem('ad-token'))
const initialUserLoginState: { status: { loggedIn: boolean } } =
  userTokens !== null
    ? {
        status: { loggedIn: true }
      }
    : {
        status: { loggedIn: false }
      }

export const useUserStore = defineStore('userStore', {
  state: (): TUserState => ({
    ...initialUserLoginState,
    user: {}
  }),

  getters: {
    loggedInStatus(state: TUserState) {
      return state.status.loggedIn
    },

    userInfo(state: TUserState) {
      return state.user
    }
  },

  actions: {
    async login(payload: TUserLoginRequest) {
      try {
        const t = await SecurityRequests.login(payload)
        const { data } = t
        localStorage.setItem(
          'ad-token',
          JSON.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token
          })
        )
        this.status.loggedIn = true

        await router.push({ name: 'Dashboard' })
      } catch (e) {
        this.status.loggedIn = false
        const errorMessage = handleError(e)
        console.error(errorMessage)
        throw e
      }
    },

    async getMe() {
      try {
        const { data } = await SecurityRequests.getMe()
        this.user = data
      } catch (e) {
        const errorMessage = handleError(e)
        console.error(errorMessage)
        throw e
      }
    },

    async logout() {
      try {
        await SecurityRequests.logout()
        localStorage.removeItem('ad-token')
        this.user = {}

        await router.push({ name: 'LoginPage' })
      } catch (e) {
        const errorMessage = handleError(e)
        console.error(errorMessage)
        throw e
      } finally {
        this.status.loggedIn = false
      }
    }
  }
})
