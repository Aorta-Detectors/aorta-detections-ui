import axios from 'axios';

export const api = () => {
  const axiosConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  };
  return axios.create(axiosConfig);
};

export default api;
