import axios from 'axios';
export const handleError = (error: unknown) => {
  let errorMessage = '';

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data?.detail;
  }

  return errorMessage || 'Произошла ошибка!';
};
