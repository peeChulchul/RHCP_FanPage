import { Container as ContainerBox } from "components/box";
import React from "react";
import { SlArrowUpCircle } from "react-icons/sl";
import styled from "styled-components";
import { windowScroll } from "utils/window-scorll";

const ArrowTopBtn = styled.aside`
  position: fixed;
  bottom: 10px;
  right: 0px;
  width: 100%;
  margin: 0 auto;
  text-align: end;
  button {
    font-size: var(--font-xl);
    width: 48px;
    height: 48px;
    background-color: var(--color-primary-alt);
    border-radius: 100%;
    cursor: pointer;
  }
  button:hover {
    background-color: var(--color-white);

    svg {
      fill: var(--color-primary-alt);
    }
  }
`;

const Container = styled(ContainerBox)`
  max-width: 1400px;
  width: 100%;
`;

export default function ArrowTop() {
  return (
    <ArrowTopBtn>
      <Container>
        <button onClick={() => windowScroll(0)}>
          <SlArrowUpCircle />
        </button>
      </Container>
    </ArrowTopBtn>
  );
}
