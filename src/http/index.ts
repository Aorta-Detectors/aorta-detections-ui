import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import SecurityRequests from '@/services/security/requests'
import router from '@/router'
import TokenService from '@/services/token'
import Notification from '@/utils/Notification'

const api = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    let tokens = TokenService.getLocalAccessToken()

    if (tokens !== null) {
      config.headers.Authorization = `Bearer ${tokens?.access_token}`
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
          const response = await SecurityRequests.refreshToken()

          TokenService.updateLocalAccessToken(response.access_token)

          return api.request(originalConfig)
        } catch (_error) {
          await router.push('/login')
          Notification.error('Вы не авторизованы!');
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

