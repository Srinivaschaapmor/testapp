import AxiosInstance from "./axiosInstance";

const baseURL = process.env.REACT_APP_LOGIC_HOST;
console.log(baseURL, "baseurl");
export const axiosInstance = AxiosInstance(baseURL);
