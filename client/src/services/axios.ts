import axios from "axios";

export const SERVER_URL = "http://localhost:3002";
const API_PATH = "api/v1";

const instance = axios.create({
  baseURL: `${SERVER_URL}/${API_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstances = {
  instance,
};

export default axiosInstances;
