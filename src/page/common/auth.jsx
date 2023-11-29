import React, { useEffect, useState } from "react";
import ModalContainer from "./modal-container";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { modalOpen } from "redux/modules/modal";
import { TextShadow } from "components/text";
import LOGIN from "./login";
import SIGNUP from "./signup";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 350px;
  max-width: 500px;
  max-height: 700px;
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 12);
  background-color: var(--color-bg);
`;

export default function AUTH() {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(modalOpen());
  }, [dispatch]);

  return (
    <ModalContainer>
      <Container>{isLogin ? <LOGIN setIsLogin={setIsLogin} /> : <SIGNUP setIsLogin={setIsLogin} />}</Container>
    </ModalContainer>
  );
}
