import { TextShadow } from "components/text";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: calc(var(--spacing) * 2);
  flex-direction: column;
  .btn {
    cursor: pointer;
    padding: calc(var(--spacing) * 4) 0;
    background-color: var(--color-dark-pink);
    filter: brightness(102%);
    font-size: var(--font-md);
    font-weight: 600;
    color: var(--color-primary-alt);
  }
  .btn:hover {
    color: var(--color-accent);
  }
  .btn_toggle {
    margin-left: auto;
    color: var(--color-black);
    font-weight: 600;
  }
  .btn_toggle:hover {
    text-decoration: underline;
    color: var(--color-primary-alt);
  }
`;

const Label = styled.label`
  font-size: var(--font-md);
  margin: 0px;
  font-weight: bold;
  color: var(--color-white);
  text-shadow: -1px 1px 0.5px var(--color-black);
`;

const AuthInput = styled.input`
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-sm);
  font-weight: bold;
  color: var(--color-black);
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;
export default function LOGIN({ setIsLogin }) {
  const [user, setUser] = useState({ id: "", password: "", nickName: "" });

  function onSubmitAuth(e) {
    e.preventDefault();
  }
  return (
    <div>
      <TextShadow $margin={"24px 0px"}>로그인</TextShadow>
      <Form onSubmit={onSubmitAuth}>
        <Label>아이디</Label>
        <AuthInput
          value={user.id}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, id: e.target.value }));
          }}
          type="text"
          placeholder="계정을 입력해주세요"
          required
        ></AuthInput>

        <Label>비밀번호</Label>
        <AuthInput
          value={user.password}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
          autoComplete="pass"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          required
        ></AuthInput>
        <button onClick={() => setIsLogin(false)} type="button" className="btn_toggle">
          회원가입
        </button>
        <button className="btn">로그인</button>
      </Form>
    </div>
  );
}
