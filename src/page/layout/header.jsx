import React from "react";
import styled from "styled-components";
import homeBgUrl from "assets/img/album/header_art.avif";
import membersBgUrl from "assets/img/member/members.webp";
import musicBgUrl from "assets/img/album/pageheader.jpg";
import { Container } from "components/box";
import { Logo } from "components/logo";
import { Link, useLocation } from "react-router-dom";

const Header = styled.header`
  min-height: 400px;
  position: relative;
  color: var(--color-white);
  background-image: ${(props) => ` url(${props.$bg});`};
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
  font-size: var(--font-md);
  font-weight: 600;
  cursor: pointer;
`;

const PageName = styled.h1`
  position: absolute;
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  top: 50%;
  left: 50%;
  text-shadow: -4px 4px 0 var(--color-primary-alt);
  transform: translate(-50%);
`;

export default function LayoutHeader() {
  const location = useLocation();
  const locationPathname = location.pathname.split("/")[1].replace(/^[a-z]/, (char) => char.toUpperCase());

  const title = locationPathname === "" ? "Home" : locationPathname;

  const headerBgs = [
    {
      title: "Home",
      bg: homeBgUrl
    },
    {
      title: "Member",
      bg: membersBgUrl
    },
    {
      title: "Music",
      bg: musicBgUrl
    }
  ];

  const { bg } = headerBgs.find((item) => item.title.includes(title));
  return (
    <Header $bg={bg}>
      <Container>
        <Navs>
          <Link to="/">
            <Logo width={"50px"} height={"50px"} />
          </Link>
          <NavBtnWrapper>
            <NavBtn>
              <Link to="/">Home</Link>
            </NavBtn>
            <NavBtn>
              <Link to="member">Member</Link>
            </NavBtn>
            <NavBtn>
              <Link to="music">Music</Link>
            </NavBtn>
          </NavBtnWrapper>
        </Navs>
        <PageName>{title}</PageName>
      </Container>
    </Header>
  );
}
