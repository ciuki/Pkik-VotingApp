import axios from "axios";
import { toast } from "react-toastify";

const errorHandler = (error) => {
  if (error.response.status === 403) {
    toast.error(`${error.response.data.message}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  }
  return Promise.reject({ ...error });
};

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => errorHandler(error)
);

export default axiosInstance;
