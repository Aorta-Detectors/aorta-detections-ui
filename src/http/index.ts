import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'
const api = (
  dispatch: TAppDispatch | null = null,
  logout: AsyncThunk<void, void, {}> | null = null,
  refresh: AsyncThunk<void, void, {}> | null = null
) => {
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
    if (!dispatch || !refresh || !logout) return
    const originalRequest: AxiosRequestConfig & { _isRetry?: boolean } = error?.config
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await dispatch(refresh())
        return api.request(originalRequest)
      } catch (e) {
        dispatch(logout())
        console.error('Вы не авторизованы!') // TODO: add toast modal
      }
    }
    throw error
  }

  const api = axios.create(axiosConfig)

  api.interceptors.request.use(setHeader)
  api.interceptors.response.use((config) => config, refreshAndRetry)
  return api
}

export default api
