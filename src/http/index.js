import axios, { AxiosError } from 'axios';
import SecurityRequests from '@/services/security/requests';
import router from '@/router';
const api = () => {
    const axiosConfig = {
        baseURL: import.meta.env.VITE_BASE_URL,
        withCredentials: true
    };
    const setHeader = (config) => {
        let tokens = JSON.parse(localStorage.getItem('ad-token'));
        if (tokens !== null) {
            config.headers.Authorization = `Bearer ${tokens?.access_token}`;
        }
        return config;
    };
    const refreshAndRetry = async (error) => {
        const originalRequest = error?.config;
        if (error &&
            error.response &&
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const { status, data } = await SecurityRequests.refreshToken();
                if (status === 200) {
                    // TODO: Update user infos
                    localStorage.setItem('ad-token', JSON.stringify({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token
                    }));
                }
                originalRequest.headers['Authorization'] = `Bearer ${data.access_toke}`;
                return axiosInstance(originalRequest);
            }
            catch (e) {
                console.error('Вы не авторизованы!'); // TODO: add toast modal
                await router.push('/login');
            }
            finally {
                originalRequest._isRetry = false;
            }
        }
        return Promise.reject(error);
    };
    const api = axios.create(axiosConfig);
    api.interceptors.request.use(setHeader);
    api.interceptors.response.use((config) => config, refreshAndRetry);
    return api;
};
export default api;
