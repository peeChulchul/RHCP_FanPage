import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLetter } from "redux/modules/letter";
import styled from "styled-components";
import { getYMDHM } from "utils/format-data";
import { v4 as uuidv4 } from "uuid";

const Form = styled.form`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  margin: calc(var(--spacing) * 10) auto;

  button {
    cursor: pointer;
    padding: calc(var(--spacing) * 4) 0;
  }
`;

const ContentArea = styled.textarea`
  resize: none;
  color: black;
  min-height: 150px;
  padding: calc(var(--spacing) * 2);
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;
const NickNameInput = styled.input`
  padding: calc(var(--spacing) * 2);
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

export default function LetterForm() {
  const [letterValue, setLetterValue] = useState({ nickname: "", content: "" });
  // const { localstorageLetters, setLocalstorageLetters } = useMemberContext();
  const localstorageLetters = useSelector((modules) => modules.modulesLetters);
  const dispatch = useDispatch();
  const { name } = useParams();

  function onSubmitLetter(e) {
    e.preventDefault();
    dispatch(addLetter({ ...letterValue, writedTo: name, id: uuidv4(), createdAt: getYMDHM() }));
    // setLocalstorageLetters([
    //   ...localstorageLetters,
    //   { ...letterValue, writedTo: name, id: uuidv4(), createdAt: getYMDHM() }
    // ]);
    setLetterValue({ nickname: "", content: "" });
  }

  return (
    <Form onSubmit={onSubmitLetter}>
      <label htmlFor="input_nickname">닉네임 </label>
      <NickNameInput
        maxLength={20}
        placeholder="최대 20자 까지 작성이 가능합니다."
        id="input_nickname"
        style={{ color: "black" }}
        onChange={(e) => setLetterValue((prev) => ({ ...prev, nickname: e.target.value }))}
        value={letterValue.nickname}
      />
      <label htmlFor="textarea_content">내용</label>
      <ContentArea
        maxLength={100}
        placeholder="최대 100자까지 작성 가능합니다."
        id={"textarea_content"}
        onChange={(e) => setLetterValue((prev) => ({ ...prev, content: e.target.value }))}
        value={letterValue.content}
      />
      <button>Submit</button>
    </Form>
  );
}
