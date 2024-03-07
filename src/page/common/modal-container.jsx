import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-color: var(--color-black);
  overflow: hidden;
  cursor: pointer;
  z-index: 3;
`;

const Container = styled.div`
  position: fixed;
  /* top: 50%;
  left: 50%; */

  /* max-width: 500px;
  width: 90%;
  height: 500px; */

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  z-index: 4;

  @media (max-width: 500px) {
    left: 10px;
    right: 10px;
    transform: translateY(-50%);
  }
`;

export default function ModalContainer({ onClickBackDrop, children }) {
  const { isOpen } = useSelector((modules) => modules.modulesModal);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <BackDrop onClick={onClickBackDrop} />
          <Container>{children}</Container>
        </>
      )}
    </>
  );
}
