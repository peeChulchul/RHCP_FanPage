import React from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";
import ArrowTop from "../arrow-top";
import styled from "styled-components";

const LayoutContainer = styled.div`
  position: relative;
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <LayoutHeader />
      <Outlet />
      <ArrowTop />
      <LayoutFooter />
    </LayoutContainer>
  );
}
