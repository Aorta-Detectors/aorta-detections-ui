import axios from 'axios';
export const commonApi = () => {
    const axiosConfig = {
        baseURL: import.meta.env.VITE_BASE_URL,
        withCredentials: true,
    };
    return axios.create(axiosConfig);
};
export default commonApi;
