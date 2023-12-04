import axios from "axios";

export const jsonServerInstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_SERVER_URL
});

// 공통으로 사용할 응답 인터셉터
const responseInterceptor = (response) => {
  // 정상 응답 처리
  return response;
};

// 공통으로 사용할 오류 응답 인터셉터
const errorInterceptor = (error) => {
  return Promise.reject(error);
};

// 요청 전에 실행되는 인터셉터
const requestInterceptor = async (config) => {
  return config;
};

// 응답 인터셉터 등록
jsonServerInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// 요청 인터셉터 등록
jsonServerInstance.interceptors.request.use(requestInterceptor);

export default jsonServerInstance;
