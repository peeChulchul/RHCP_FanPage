import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import logoUrl from "assets/img/logo/logo.png";

const Container = styled.div`
  filter: brightness(105%);
  background-color: var(--color-bg);
  height: 100px;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);

  /* 그림자 추가필요*/
`;

const AvaterBox = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  h1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) => `url(${props.$img})`};
`;

const Content = styled.div`
  display: block;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function Letter({ letter }) {
  const { avatar = logoUrl, content, id, nickname } = letter;
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`${params.name}/${id}`)}>
      <AvaterBox>
        <Avatar $img={avatar} />
        <h1>{nickname}</h1>
      </AvaterBox>
      <Content>{content}</Content>
    </Container>
  );
}
