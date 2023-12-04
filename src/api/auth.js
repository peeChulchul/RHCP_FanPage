import axios from "axios";

export const authServerInstance = axios.create({
  baseURL: process.env.REACT_APP_JWT_SERVER_URL
});

// 공통으로 사용할 응답 인터셉터
const responseInterceptor = (response) => {
  return response;
};

// 공통으로 사용할 오류 응답 인터셉터
const errorInterceptor = (error) => {
  // 오류 응답 처리
  if (error.response && error.response.status === 401) {
    sessionStorage.clear("AUTH");
  }

  return Promise.reject(error);
};

// 요청 전에 실행되는 인터셉터
const requestInterceptor = async (config) => {
  return config;
};

// 응답 인터셉터 등록
authServerInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// 요청 인터셉터 등록
authServerInstance.interceptors.request.use(requestInterceptor);

export default authServerInstance;
