import { styled, keyframes } from "styled-components";

const spin = keyframes`
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
`;

const Container = styled.div`
  height: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 200px;
  height: 200px;
  border: 10px solid var(--color-primary-alt);
  border-bottom-color: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
`;

export function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}
