import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import SecurityRequests from '@/services/security/requests'
import router from '@/router'
import TokenService from '@/services/token'
import Notification from '@/utils/Notification'

export const api = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    let access_token = TokenService.getLocalAccessToken()

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig :AxiosRequestConfig & { _isRetry?: boolean } =  err?.config

    if (originalConfig.url !== '/api/auth/login' && err.response) {

      if (err.response.status === 401 && !originalConfig._isRetry) {
        originalConfig._isRetry = true

        try {
          const { data, status } = await SecurityRequests.refreshToken()

          TokenService.updateLocalAccessToken(data.access_token)
          TokenService.updateLocalRefreshToken(data.refresh_token)

          return api.request(originalConfig)
        } catch (_error) {
          await router.push('/login')
          await SecurityRequests.logout()
          TokenService.removeUserTokens()
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  }
)

export default api

