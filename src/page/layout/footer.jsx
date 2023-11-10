import { Container } from "components/box";
import { Logo } from "components/logo";
import { AccentText } from "components/text";
import React from "react";

import { AiFillYoutube, AiFillInstagram, AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import styled from "styled-components";

const FooterContents = styled(Container)`
  padding: calc(var(--spacing) * 4) 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing) * 4);
`;

const IconsBox = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 4);
  align-items: center;
  svg {
    font-size: var(--font-lg);
    fill: var(--color-primary-alt);
  }
`;

const LogoContents = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: var(--spacing);
`;

export default function LayoutFooter() {
  return (
    <footer>
      <FooterContents>
        <IconsBox>
          <AiFillFacebook />
          <AiOutlineTwitter />
          <AiFillInstagram />
          <AiFillYoutube />
          <BsSpotify />
        </IconsBox>
        <LogoContents>
          <Logo />
          <p>
            <AccentText>RHCP</AccentText> <br />
            FanPage
          </p>
        </LogoContents>
        <p>@ 2023 rhcp fanPage uuid react-icon</p>
      </FooterContents>
    </footer>
  );
}
