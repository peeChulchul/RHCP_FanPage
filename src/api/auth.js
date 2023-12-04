import axios from "axios";

export const authServerInstance = axios.create({
  baseURL: process.env.REACT_APP_JWT_SERVER_URL
});

// 공통으로 사용할 응답 인터셉터
const responseInterceptor = (response) => {
  // 정상 응답 처리
  return response;
};

// 공통으로 사용할 오류 응답 인터셉터
const errorInterceptor = (error) => {
  // 오류 응답 처리
  if (error.response && error.response.status === 401) {
    sessionStorage.clear("AUTH");
    // 401 Unauthorized 오류가 발생한 경우
    // 여기서 원하는 동작을 수행 (예: 로그인 페이지로 리다이렉트)
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
