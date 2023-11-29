import React, { useEffect, useState } from "react";

export default function useValidationInput(currentValue) {
  const [validText, setValidText] = useState({
    nickName: null,
    id: null,
    password: null,
    passwordConfirm: null
  });
  const [validation, setValidation] = useState({
    nickName: false,
    id: false,
    password: false,
    passwordConfirm: false
  });

  useEffect(() => {
    const exp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (currentValue.nickName === "") return;
    if (!exp.test(currentValue.nickName)) {
      setValidText((prev) => ({ ...prev, nickName: "특수문자 사용은 불가능하며 2글자 이상 값을 입력해주세요" }));
      setValidation((prev) => ({ ...prev, nickName: false }));
    } else {
      setValidation((prev) => ({ ...prev, nickName: true }));
      setValidText((prev) => ({ ...prev, nickName: null }));
    }
  }, [currentValue.nickName]);

  useEffect(() => {
    const exp = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/;
    if (currentValue.id === "") return;
    if (!exp.test(currentValue.id)) {
      setValidText((prev) => ({ ...prev, id: "영어 또는 숫자만 지원하며 3글자 이상 값을 입력해주세요" }));
      setValidation((prev) => ({ ...prev, id: false }));
    } else {
      setValidation((prev) => ({ ...prev, id: true }));
      setValidText((prev) => ({ ...prev, id: null }));
    }
  }, [currentValue.id]);

  useEffect(() => {
    const exp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}/;
    if (currentValue.password === "") return;
    if (!exp.test(currentValue.password)) {
      setValidText((prev) => ({ ...prev, password: "영어 또는 숫자만 지원하며 6글자 이상 값을 입력해주세요" }));
      setValidation((prev) => ({ ...prev, password: false }));
    } else {
      setValidation((prev) => ({ ...prev, password: true }));
      setValidText((prev) => ({ ...prev, password: null }));
    }
  }, [currentValue.password]);

  useEffect(() => {
    const currentPassword = currentValue.password;
    if (currentValue.password === "") return;
    if (currentPassword === currentValue.passwordConfirm) {
      setValidation((prev) => ({ ...prev, passwordConfirm: true }));
      setValidText((prev) => ({ ...prev, passwordConfirm: null }));
    } else {
      setValidText((prev) => ({ ...prev, passwordConfirm: "비밀번호가 일치하지않습니다." }));
      setValidation((prev) => ({ ...prev, passwordConfirm: false }));
    }
  }, [currentValue.passwordConfirm, currentValue.password]);

  return [validText, validation];
}
