import axios from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export const loginUser = (data) => {
  return axios.post(ENDPOINTS.LOGIN, data);
};

export const registerUser = (data) => {
  return axios.post(ENDPOINTS.REGISTER, data);
};