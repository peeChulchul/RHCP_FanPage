import React, { useEffect, useState } from "react";

export default function useValidationInput(currentValue) {
  const [validText, setValidText] = useState({
    nickname: null,
    id: null,
    password: null,
    passwordConfirm: null
  });
  const [validation, setValidation] = useState({
    nickname: false,
    id: false,
    password: false,
    passwordConfirm: false
  });

  useEffect(() => {
    const exp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{1,10}$/;
    if (currentValue.nickname === "") {
      return setValidation((prev) => ({ ...prev, nickname: false }));
    }
    if (!exp.test(currentValue.nickname)) {
      setValidText((prev) => ({ ...prev, nickname: "특수문자 및 초성, 모음 사용은 불가능합니다." }));
      setValidation((prev) => ({ ...prev, nickname: false }));
    } else {
      setValidation((prev) => ({ ...prev, nickname: true }));
      setValidText((prev) => ({ ...prev, nickname: null }));
    }
  }, [currentValue.nickname]);

  useEffect(() => {
    const exp = /^[a-zA-Z0-9]{4,10}$/;
    if (currentValue.id === "") {
      return setValidText((prev) => ({ ...prev, id: null }));
    }
    if (!exp.test(currentValue.id)) {
      setValidText((prev) => ({ ...prev, id: "영어 또는 숫자만 지원하며 4글자 이상 값을 입력해주세요" }));
      setValidation((prev) => ({ ...prev, id: false }));
    } else {
      setValidation((prev) => ({ ...prev, id: true }));
      setValidText((prev) => ({ ...prev, id: null }));
    }
  }, [currentValue.id]);

  useEffect(() => {
    const exp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}/;
    if (currentValue.password === "") {
      return setValidText((prev) => ({ ...prev, password: null }));
    }
    if (!exp.test(currentValue.password)) {
      setValidText((prev) => ({ ...prev, password: "영문 + 숫자 조합으로 4글자 이상 입력해주세요" }));
      setValidation((prev) => ({ ...prev, password: false }));
    } else {
      setValidation((prev) => ({ ...prev, password: true }));
      setValidText((prev) => ({ ...prev, password: null }));
    }
  }, [currentValue.password]);

  useEffect(() => {
    const currentPassword = currentValue.password;
    if (currentValue.password === "") {
      return;
    }
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
