import axios from "axios";

export const authServerInstance = axios.create({
  baseURL: process.env.REACT_APP_JWT_SERVER_URL
});
