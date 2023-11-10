import styled from "styled-components";
import LogoUrl from "assets/img/logo/logo.png";

export const Logo = styled.div`
  width: ${(props) => (props.width ? props.width : "40px")};
  height: ${(props) => (props.height ? props.height : "40px")};
  background-image: url(${LogoUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;
