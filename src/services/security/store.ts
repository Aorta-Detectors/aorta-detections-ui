import { defineStore } from 'pinia'
import type { TUser, TUserLoginRequest, UserStore } from '@/services/security/types'
import { handleError } from '@/utils/handleError'
import SecurityRequests from '@/services/security/requests'

export const useUserStore = defineStore('userStore', {
  state: (): UserRootState => ({
    user: <TUser>{},
    status: { loggedIn: false }
  }),

  actions: {
    async login(payload: TUserLoginRequest){
      try {
        const t = await SecurityRequests.login(payload)
        const {data} = t
        console.log(data)
        //localStorage.setItem('ap-token', data)
        this.status = true
      }catch (e) {
        this.status = false
        const errorMessage = handleError(e)
        console.error(errorMessage)
        throw e
      }
    }
    
  }
})
