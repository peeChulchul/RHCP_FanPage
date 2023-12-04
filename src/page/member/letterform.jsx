import { TextShadow } from "components/text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getAuth } from "redux/modules/auth";
import { __addLetters } from "redux/modules/letter";
import styled from "styled-components";
import { getYMDHM } from "utils/format-data";
import { submitchecker } from "utils/input-check";
import { v4 as uuidv4 } from "uuid";

const Form = styled.form`
  width: 100%;
  max-width: 600px;
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
  const [letterValue, setLetterValue] = useState({ content: "" });
  const { currentUser } = useSelector((modules) => modules.modulesAuth);
  const dispatch = useDispatch();
  const { name } = useParams();

  function onSubmitLetter(e) {
    const { content } = letterValue;
    e.preventDefault();
    const inputCheck = submitchecker({ content });

    if (inputCheck) {
      dispatch(
        __addLetters({
          content,
          nickname: currentUser.nickname,
          writedTo: name,
          id: uuidv4(),
          createdAt: getYMDHM(),
          timestamp: new Date(getYMDHM()).getTime() / 1000,
          uid: currentUser.id,
          avatar: currentUser.avatar
        })
      );
      setLetterValue({ nickname: "", content: "" });
    } else return;
  }

  return (
    <Form onSubmit={onSubmitLetter}>
      <InputLabel as={"label"} htmlFor="input_nickname">
        {name}에게 편지를 작성해보세요
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
