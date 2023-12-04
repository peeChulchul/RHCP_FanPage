import axios from "axios";
import authServerInstance from "./auth";

export const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_SERVER_URL
});

// 공통으로 사용할 응답 인터셉터
const responseInterceptor = (response) => {
  return response;
};

// 공통으로 사용할 오류 응답 인터셉터
const errorInterceptor = (error) => {
  return Promise.reject(error);
};

// 요청 전에 실행되는 인터셉터
const requestInterceptor = async (config) => {
  const sessionAUTH = JSON.parse(sessionStorage.getItem("AUTH"));

  if (sessionAUTH === null) {
    return config;
  }

  const { accessToken } = sessionAUTH;

  try {
    console.log("Sending request to /user endpoint");
    const response = await authServerInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return config;
  } catch (error) {
    sessionStorage.clear("AUTH");
    return Promise.reject(error.response);
  }
};

// 응답 인터셉터 등록
jsonServerInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// 요청 인터셉터 등록
jsonServerInstance.interceptors.request.use(requestInterceptor);

export default jsonServerInstance;
