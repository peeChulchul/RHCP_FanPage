import { TextShadow } from "components/text";
import useValidationInput from "hooks/useValidationInput";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  .btn {
    cursor: pointer;
    padding: calc(var(--spacing) * 4) 0;
    background-color: var(--color-dark-pink);
    filter: brightness(102%);
    font-size: var(--font-md);
    font-weight: 600;
    color: var(--color-primary-alt);
    margin: calc(var(--spacing) * 3) 0;
  }
  .btn:hover {
    color: var(--color-accent);
  }
  .btn_toggle {
    color: var(--color-black);
    margin: calc(var(--spacing) * 2) 0;
    font-weight: 600;
    margin-left: auto;
  }
  .btn_toggle:hover {
    text-decoration: underline;
    color: var(--color-primary-alt);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  border: 2px solid black;
  border-radius: 4px;
  margin-bottom: calc(var(--spacing) * 4);
`;

const AuthInput = styled.input`
  width: 100%;
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-sm);
  font-weight: bold;
  color: var(--color-black);
  border: none;
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

const Label = styled.label`
  padding-bottom: calc(var(--spacing) * 2);
  font-size: var(--font-md);
  margin: 0px;
  font-weight: bold;
  color: var(--color-white);
  text-shadow: -1px 1px 0.5px var(--color-black);
`;

const SvgBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 4px;
  svg {
    fill: var(--color-primary-alt);
  }
`;

const Error = styled.div`
  padding-top: var(--spacing);
  position: absolute;
  bottom: -16px;
  width: 100%;
  min-height: 14px;
  font-size: 10px;
  color: var(--color-accent);
  text-align: right;
`;

export default function SIGNUP({ setIsLogin }) {
  const [user, setUser] = useState({ id: "", password: "", passwordConfirm: "", nickName: "" });
  const [validText, validation] = useValidationInput(user);

  function onSubmitAuth(e) {
    e.preventDefault();
  }

  return (
    <div>
      <TextShadow $margin={"24px 0px"}>회원가입</TextShadow>
      <Form onSubmit={onSubmitAuth}>
        <Label htmlFor="nickname_input">닉네임</Label>

        <InputWrapper>
          <AuthInput
            id="nickname_input"
            value={user.nickName}
            maxLength={16}
            minLength={2}
            onChange={(e) => setUser((prev) => ({ ...prev, nickName: e.target.value }))}
            placeholder="닉네임을 입력해주세요"
            required
            $validation={validation.nickName}
          />
          {validation.nickName && (
            <SvgBox>
              <FaCheckCircle />
            </SvgBox>
          )}

          <Error>{validText.nickName}</Error>
        </InputWrapper>
        <Label htmlFor="id_input">계정</Label>

        <InputWrapper>
          <AuthInput
            id={"id_input"}
            value={user.id}
            minLength={3}
            maxLength={16}
            onChange={(e) => setUser((prev) => ({ ...prev, id: e.target.value }))}
            placeholder="계정을 입력해주세요"
            required
            $validation={validation.id}
          />
          {validation.id && (
            <SvgBox>
              <FaCheckCircle />
            </SvgBox>
          )}
          <Error>{validText.id}</Error>
        </InputWrapper>
        <Label htmlFor="password_input">비밀번호</Label>

        <InputWrapper>
          <AuthInput
            id={"password_input"}
            value={user.password}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            autoComplete="pass"
            minLength={6}
            maxLength={16}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            required
            $validation={validation.password}
          />
          {validation.password && (
            <SvgBox>
              <FaCheckCircle />
            </SvgBox>
          )}
          <Error>{validText.password}</Error>
        </InputWrapper>
        <Label htmlFor="passwordConfirm_input">비밀번호확인</Label>

        <InputWrapper>
          <AuthInput
            id={"passwordConfirm_input"}
            value={user.passwordConfirm}
            placeholder="비밀번호를 확인해주세요"
            type="password"
            autoComplete="pass"
            minLength={6}
            maxLength={16}
            onChange={(e) => setUser((prev) => ({ ...prev, passwordConfirm: e.target.value }))}
            required
            $validation={validation.passwordConfirm}
          />
          {validation.passwordConfirm && (
            <SvgBox>
              <FaCheckCircle />
            </SvgBox>
          )}
          <Error>{validText.passwordConfirm}</Error>
        </InputWrapper>
        <button onClick={() => setIsLogin(true)} type="button" className="btn_toggle">
          로그인
        </button>
        <button className="btn">회원가입</button>
      </Form>
    </div>
  );
}
