import axios from "axios";

export const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_SERVER_URL
});
