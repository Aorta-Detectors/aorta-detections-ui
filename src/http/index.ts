import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import SecurityRequests from '@/services/security/requests'

const api = () => {
  const axiosConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
  }

  const setHeader = (config: AxiosRequestConfig) => {
    let tokens = JSON.parse(localStorage.getItem('ad-token'))

    if (tokens !== null) {
      config.headers.Authorization = `Bearer ${tokens?.access_token}`
    }

    return config
  }

  const refreshAndRetry = async (error: AxiosError<AxiosRequestConfig>) => {
    const originalRequest: AxiosRequestConfig & { _isRetry?: boolean } = error?.config;
    if(error && error.response && error.response.status === 401 && originalRequest && !originalRequest._isRetry ){
      originalRequest._isRetry = true
      try {
        const {status, data} = await SecurityRequests.refreshToken()
        if(status === 200){
          // TODO: Update user infos
          localStorage.setItem(
            'ad-token',
            JSON.stringify({
              access_token: data.access_token,
              refresh_token: data.refresh_token
            })
          )
        }

      }catch (e) {
        console.error('Вы не авторизованы!') // TODO: add toast modal
        //await SecurityRequests.logout()
      }
    }
  }
  const api = axios.create(axiosConfig)

  api.interceptors.request.use(setHeader)
  api.interceptors.response.use((config) => config, refreshAndRetry)
  return api
}

export default api
