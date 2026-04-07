import axios from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export const getServiceRecommendations = () => {
  return axios.get(ENDPOINTS.RECOMMENDATIONS.GET_SERVICES);
};
