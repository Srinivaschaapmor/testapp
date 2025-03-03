import axios from "axios";

// const token = Cookies.get("jwtToken");

const AxiosInstance = (baseURL) => {
  const initAxiosInstance = () => {
    const options = {
      baseURL: baseURL || "http://192.168.0.104:7000",

      timeout: 10000,
    };
    console.log(options, "options");
    const axiosInstance = axios.create(options);
    return axiosInstance;
  };

  return initAxiosInstance();
};

export default AxiosInstance;
