import React from "react";
import styled from "styled-components";
import headerBgUrl from "assets/img/album/header_art.avif";
import { Container } from "components/box";
import { Logo } from "components/logo";

const Header = styled.header`
  height: 400px;
  background-image: url(${headerBgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: "100% 100%";
  width: 100%;
`;

const Navs = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBtnWrapper = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 4);
`;

const NavBtn = styled.button``;

const PageName = styled.h1`
  text-align: center;
  font-size: var(--font-xl);
`;

export default function LayoutHeader() {
  return (
    <Header>
      <Container>
        <Navs>
          <Logo />
          <NavBtnWrapper>
            <NavBtn>Member</NavBtn>
            <NavBtn>Music</NavBtn>
          </NavBtnWrapper>
        </Navs>
        <PageName>Member</PageName>
      </Container>
    </Header>
  );
}
