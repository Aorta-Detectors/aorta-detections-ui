import axios from 'axios';
export const handleError = (error: unknown) => {
  let errorMessage = '';

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data?.message;
  }

  return errorMessage || 'Произошла ошибка!';
};
