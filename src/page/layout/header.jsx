import React from "react";
import styled from "styled-components";
import headerBgUrl from "assets/img/album/header_art.avif";
import membersBgUtl from "assets/img/member/members.webp";
import { Container } from "components/box";
import { Logo } from "components/logo";
import { useLocation, useParams } from "react-router-dom";

const Header = styled.header`
  min-height: 400px;
  position: relative;
  color: var(--color-white);
  background-image: url(${membersBgUtl});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: calc(var(--spacing) * 6) 0;
  &:before {
    opacity: ${(props) => (props.$slected ? "0.5" : "1")};
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-black);
    opacity: 0.4;
  }
`;

const Navs = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NavBtnWrapper = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 4);
`;

const NavBtn = styled.button`
  cursor: pointer;
`;

const PageName = styled.h1`
  position: absolute;
  text-align: center;
  font-size: var(--font-xl);
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

export default function LayoutHeader() {
  const location = useLocation();
  const params = useParams();
  const title = location.pathname.split("/")[1].toUpperCase();

  return (
    <Header>
      <Container>
        <Navs>
          <Logo width={"50px"} height={"50px"} />
          <NavBtnWrapper>
            <NavBtn>Member</NavBtn>
            <NavBtn>Music</NavBtn>
          </NavBtnWrapper>
        </Navs>
        <PageName>{title}</PageName>
      </Container>
    </Header>
  );
}
