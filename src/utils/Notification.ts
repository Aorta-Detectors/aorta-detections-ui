import  type {AxiosResponse} from 'axios'
import { toast, Flip } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { handleError } from '@/utils/handleError'

const config: {} = {
  position: 'top-right',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: true,
  transition: Flip,
  style: {
    fontSize: '14px',
  },
};

class Notification {
  static default = (message: string) => {
    toast(message, { ...config, type: toast.TYPE.DEFAULT });
  };
  static info = (message: string) => {
    toast(message, { ...config, type: toast.TYPE.INFO });
  };
  static success = (message: string) => {
    toast(message, { ...config, type: toast.TYPE.SUCCESS });
  };
  static error = (message: string) => {
    toast(message, { ...config, type: toast.TYPE.ERROR });
  };
  static warning = (message: string) => {
    toast(message, { ...config, type: toast.TYPE.WARNING });
  };
  static promise = async <T>(fn: Promise<AxiosResponse<T>>, checkErr?: boolean) => {
    return toast.promise(
      fn,
      {
        pending: 'Обрабатывается...',
        success: 'Успешно! ',
        error: {
          render({ data }) {
            const errMessage = handleError(data);
            return checkErr && errMessage ? errMessage : 'Ошибка!';
          },
        },
      },
      config
    );
  };
}

export default Notification;
