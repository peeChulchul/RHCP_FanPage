import styled from "styled-components";

export const AccentText = styled.strong`
  color: var(--color-accent);
  font-weight: bold;
`;

export const TextShadow = styled.h1`
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "var(--font-xl)")};
  margin: ${(props) => (props.$margin ? props.$margin : "calc(var(--spacing) * 8) 0")};
  font-weight: bold;
  color: var(--color-white);
  text-shadow: -2px 3px 0 var(--color-primary-alt);
`;
