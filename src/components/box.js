const { default: styled } = require("styled-components");

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const BackDrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-black);
  overflow: hidden;
  cursor: pointer;
`;
