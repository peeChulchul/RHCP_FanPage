import React from "react";
import styled from "styled-components";

const Container = styled.div`
  filter: brightness(105%);
  background-color: var(--color-bg);
  height: 100px;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing);

  /* 그림자 */
`;

const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: white;
`;

const Content = styled.div`
  display: block;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function Letter({ letter }) {
  const { avatar, content, createdAt, id, nickname, writedTo } = letter;
  return (
    <Container style={{}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar />
        <h1>{nickname}</h1>
      </div>
      <Content>{content}</Content>
    </Container>
  );
}
