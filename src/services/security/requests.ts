import { API } from '@/http/api'

const serviceBasePath = '/login'

export const SecurityRequests = {
  postRegisterUser(payload) {
    return API.makePostRequest(`${serviceBasePath}/register`, payload)
  },

  postLogin(payload) {
    return API.makePostRequest(`${serviceBasePath}/auth`, payload)
  },

  getUserMe() {
    return API.makeGetRequest(`users/me`)
  },

}
