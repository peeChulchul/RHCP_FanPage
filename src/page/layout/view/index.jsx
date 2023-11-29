import React from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";
import ArrowTop from "../arrow-top";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Container } from "components/box";

const LayoutContainer = styled.div`
  position: relative;
`;

export default function Layout({ children }) {
  const { isOpen } = useSelector((modules) => modules.modulesModal);
  console.log(isOpen);

  return (
    <LayoutContainer>
      <LayoutHeader />
      {/* {nesting사용시 outlet} */}
      {/* <Outlet /> */}

      {children}
      <ArrowTop />
      <LayoutFooter />
    </LayoutContainer>
  );
}
