import React, { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import useValidationInput from "hooks/useValidationInput";
import { useDispatch } from "react-redux";
import { __modifyAuth } from "redux/modules/auth";

const InpurtWrapper = styled.form`
  position: relative;
  border: 2px solid black;
  border-radius: 4px;
  margin-bottom: calc(var(--spacing) * 4);
`;

const NickNameInput = styled.input`
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-sm);
  font-weight: bold;
  color: var(--color-black);
  border: none;
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;
const Error = styled.div`
  padding-top: calc(var(--spacing) * 2);
  position: absolute;
  bottom: -24px;
  width: 100%;
  min-height: 14px;
  font-size: 10px;
  color: var(--color-accent);
  text-align: right;
`;
const SvgButton = styled.button`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: var(--font-md);
  transform: translateY(-50%);
  left: 105%;
  svg {
    fill: var(--color-primary-alt);
  }
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

export default function ModifyNickName({ currentUser, setModifyNickName }) {
  const [newNickName, setNewNickName] = useState("");
  const [validText, validation] = useValidationInput({ nickname: newNickName });
  const dispatch = useDispatch();

  async function onSubmitNewNickname(e) {
    e.preventDefault();
    if (!validation.nickname) {
      return alert("닉네임이 올바르지않습니다.");
    }
    dispatch(__modifyAuth({ accesToken: currentUser.accesToken, nickname: newNickName, avatar: currentUser.avatar }));
    setModifyNickName(false);
  }

  return (
    <InpurtWrapper onSubmit={onSubmitNewNickname}>
      <NickNameInput
        maxLength={10}
        minLength={1}
        required
        placeholder="새로운 닉네임을 입력해주세요"
        value={newNickName}
        onChange={(e) => {
          setNewNickName(e.target.value);
        }}
      />
      <SvgButton>
        <FaSave />
      </SvgButton>

      {validation.nickname && (
        <SvgBox>
          <FaCheckCircle />
        </SvgBox>
      )}
      <Error>{validText.nickname}</Error>
    </InpurtWrapper>
  );
}
