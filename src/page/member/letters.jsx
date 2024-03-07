import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "components/box";
import { TbMoodCry } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { __getAuth } from "redux/modules/auth";

const LetterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: calc(var(--spacing) * 2);

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Letter = styled.div`
  filter: brightness(105%);
  background-color: var(--color-bg);
  height: 100px;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  cursor: pointer;
  transition: all 0.3s linear;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.38);
  &:hover {
    outline: 4px solid var(--color-primary-alt);
  }
`;

const AvaterBox = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  h1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: var(--font-md);
    color: var(--color-black);
    font-weight: 600;
  }
`;

const Content = styled.div`
  display: block;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  color: var(--color-black);
  white-space: nowrap;
`;

const EmptyIconBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: var(--font-xl);
  gap: calc(var(--spacing) * 4);
  font-weight: bold;
  path {
    color: var(--color-accent);
  }
  h1 {
    color: var(--color-accent);
  }
`;

export default function Letters({ selectedLetter }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onClickLetter(id) {
    const sessionAUTH = JSON.parse(sessionStorage.getItem("AUTH"));

    dispatch(__getAuth(sessionAUTH.accessToken));
    navigate(`${name}/${id}`);
  }

  return (
    <>
      <LetterContainer>
        {selectedLetter.map(({ id, avatar, content, nickname, uid }) => (
          <Letter key={id} onClick={() => onClickLetter(id)}>
            <AvaterBox>
              <Avatar $img={avatar} />
              <h1>{nickname}</h1>
            </AvaterBox>
            <Content>{content}</Content>
          </Letter>
        ))}
      </LetterContainer>
      {selectedLetter.length === 0 && name && (
        <EmptyIconBox>
          <TbMoodCry />
          <h1>Empty...</h1>
        </EmptyIconBox>
      )}
    </>
  );
}
