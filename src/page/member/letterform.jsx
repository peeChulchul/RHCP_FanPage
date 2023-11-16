import { TextShadow } from "components/text";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addLetter } from "redux/modules/letter";
import styled from "styled-components";
import { getYMDHM } from "utils/format-data";
import { submitchecker } from "utils/input-check";
import { v4 as uuidv4 } from "uuid";

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  margin: auto;
  button {
    cursor: pointer;
    padding: calc(var(--spacing) * 4) 0;
    background-color: var(--color-dark-pink);
    filter: brightness(102%);
    font-size: var(--font-md);
    font-weight: 600;
    color: var(--color-primary-alt);
  }
  button:hover {
    color: var(--color-accent);
  }
`;

const InputLabel = styled(TextShadow)`
  margin: var(--spacing) 0;
  font-size: var(--font-lg);
`;

const NickNameInput = styled.input`
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-md);
  font-weight: bold;
  color: var(--color-black);
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

const ContentArea = styled.textarea`
  resize: none;
  color: var(--color-black);
  min-height: 150px;
  padding: calc(var(--spacing) * 2);
  &:focus {
    outline: 3px solid var(--color-primary-alt);
  }
`;

export default function LetterForm() {
  const [letterValue, setLetterValue] = useState({ nickname: "", content: "" });
  const dispatch = useDispatch();
  const { name } = useParams();
  const nickNameRef = useRef(null);
  const contentRef = useRef(null);

  function onSubmitLetter(e) {
    const { nickname, content } = letterValue;
    e.preventDefault();
    const inputCheck = submitchecker({ nickname, content, nickNameRef, contentRef });

    if (inputCheck) {
      dispatch(addLetter({ ...letterValue, writedTo: name, id: uuidv4(), createdAt: getYMDHM() }));
      setLetterValue({ nickname: "", content: "" });
      nickNameRef.current.focus();
    } else return;
  }

  return (
    <Form onSubmit={onSubmitLetter}>
      <InputLabel as={"label"} htmlFor="input_nickname">
        닉네임
      </InputLabel>
      <NickNameInput
        ref={nickNameRef}
        maxLength={20}
        placeholder="최대 20자 까지 작성이 가능합니다."
        id="input_nickname"
        onChange={(e) => setLetterValue((prev) => ({ ...prev, nickname: e.target.value }))}
        value={letterValue.nickname}
      />
      <InputLabel ref={contentRef} as={"label"} htmlFor="textarea_content">
        내용
      </InputLabel>
      <ContentArea
        maxLength={200}
        placeholder="최대 200자까지 작성 가능합니다."
        id={"textarea_content"}
        onChange={(e) => setLetterValue((prev) => ({ ...prev, content: e.target.value }))}
        value={letterValue.content}
      />
      <button>Submit</button>
    </Form>
  );
}
