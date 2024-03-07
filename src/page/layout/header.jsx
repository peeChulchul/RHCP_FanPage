import React, { useEffect, useState } from "react";
import styled from "styled-components";
import homeBgUrl from "assets/img/album/header_art.avif";
import membersBgUrl from "assets/img/member/members.webp";
import musicBgUrl from "assets/img/album/pageheader.jpg";
import { Container } from "components/box";
import { Logo } from "components/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from "assets/img/etc/default_avatar.webp";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "redux/modules/auth";

const Header = styled.header`
  padding-bottom: 30%;
  position: relative;
  width: 100%;
  color: var(--color-white);
  background-color: var(--color-black);
  &:before {
    opacity: ${(props) => (props.$slected ? "0.5" : "1")};
    content: "";
    position: absolute;
    background-image: ${(props) => ` url(${props.$bg});`};
    background-size: cover;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
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
  align-items: center;
  gap: calc(var(--spacing) * 4);

  @media (max-width: 600px) {
    gap: calc(var(--spacing) * 3);
  }
`;

const NavBtn = styled.button`
  font-size: var(--font-md);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    a {
      color: var(--color-accent);
    }
  }

  @media (max-width: 600px) {
    font-size: 1rem;
  }
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

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Avater = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: ${({ $avatar }) => ($avatar ? `url(${$avatar})` : `url(${defaultAvatar})`)};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
`;

const AvaterMenu = styled.ul`
  cursor: default;
  position: absolute;
  top: 100%;
  width: 100px;
  right: 0;
  border-radius: 8px;
  background-color: var(--color-dark-pink);
  box-shadow: 1px 2px 5px var(--color-white);
  padding: calc(var(--spacing) * 2) 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
  li {
    color: var(--color-black);
    background-color: var(--color-dark-pink);
    cursor: pointer;
    font-weight: 600;
    padding: calc(var(--spacing) * 2) var(--spacing);
  }
  li:hover {
    filter: brightness(0.9);
  }
`;

export default function LayoutHeader() {
  const { isLoading, isError, error, currentUser } = useSelector((modules) => modules.modulesAuth);

  const location = useLocation();
  const navigate = useNavigate();
  const locationPathname = location.pathname.split("/")[1];
  const title = locationPathname === "" ? "Home" : locationPathname;
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const dispatch = useDispatch();

  const headerBgs = [
    {
      title: "Home",
      bg: homeBgUrl
    },
    {
      title: "MyPage",
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

  const bg = headerBgs.find((item) => item.title.includes(title))?.bg;
  return (
    <Header $bg={bg}>
      <Container>
        <Navs>
          <Link to="/">
            <Logo width={"50px"} height={"50px"} />
          </Link>
          <NavBtnWrapper>
            <NavBtn>
              <Link to={"/"}>Home</Link>
            </NavBtn>
            <NavBtn>
              <Link to={"/Member"}>Member</Link>
            </NavBtn>
            <NavBtn>
              <Link to={"/Music"}>Music</Link>
            </NavBtn>
            {Object.keys(currentUser).length > 0 && (
              <>
                |
                <Avater onClick={() => setShowAvatarMenu((prev) => !prev)} $avatar={currentUser.avatar}>
                  {showAvatarMenu && (
                    <AvaterMenu>
                      <li onClick={() => navigate(`/MyPage/${currentUser.id}`)}>마이 페이지</li>
                      <li
                        onClick={() => {
                          navigate("/");
                          dispatch(authLogout());
                        }}
                      >
                        로그아웃
                      </li>
                    </AvaterMenu>
                  )}
                </Avater>
              </>
            )}
          </NavBtnWrapper>
        </Navs>
        <PageName>{title}</PageName>
      </Container>
    </Header>
  );
}
