import { styled } from "styled-components";
import logoUrl from "assets/img/logo/logo.png";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    padding: 0 calc(var(--spacing) * 5);
  }
  @media screen and (max-width: 600px) {
    padding: 0 calc(var(--spacing) * 2);
  }
`;

export const ImgCard = styled.div`
  /* height: ${(props) => (props.$height ? props.$height : "250px")}; */
  border-radius: ${(props) => (props.$boardRadius ? props.$boardRadius : "12px")};
  cursor: pointer;
  position: relative;
  padding-bottom: 100%;
  width: 100%;
  &:after {
    content: "";
    position: absolute;
    background-image: ${(props) => `url(${props.$bg})`};
    background-size: cover;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;

export const Avatar = styled.div`
  border-radius: 50%;
  width: ${(props) => (props.$width ? props.$width : "50px")};
  height: ${(props) => (props.$height ? props.$height : "50px")};
  flex-shrink: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : `url(${logoUrl})`)};
`;
