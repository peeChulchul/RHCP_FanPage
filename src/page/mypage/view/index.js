import { Container as ContainerBox } from "components/box";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TextShadow } from "components/text";
import { FaPen } from "react-icons/fa6";
import ModifyNickName from "../modify-nickname";
import ModifyAvatar from "../modify-avatar";

const Container = styled(ContainerBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing) * 4);
  margin-bottom: calc(var(--spacing) * 4);
`;

const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  font-size: var(--font-md);
  color: var(--color-black);
  border-radius: 8px;
  font-weight: 600;
  background-color: var(--color-dark-pink);
  cursor: pointer;
  filter: brightness(1.05);
  path {
    fill: var(--color-black);
  }
  &:hover {
    color: var(--color-primary-alt);
    filter: brightness(1.1);
  }
  &:hover path {
    fill: var(--color-primary-alt);
  }
  #fileUpload {
    display: none;
  }
`;

export default function PageMyPage() {
  const { isLoading, isError, error, currentUser } = useSelector((modules) => modules.modulesAuth);
  const [modifyNickName, setModifyNickName] = useState(false);

  return (
    <Container>
      <TextShadow>{currentUser.id}</TextShadow>
      <ModifyAvatar currentUser={currentUser} avatar={currentUser.avatar} />

      {modifyNickName ? (
        <ModifyNickName setModifyNickName={setModifyNickName} currentUser={currentUser} />
      ) : (
        <PropertyWrapper onClick={() => setModifyNickName(true)}>
          {currentUser.nickname}
          <FaPen />
        </PropertyWrapper>
      )}
    </Container>
  );
}
