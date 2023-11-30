import React, { useEffect } from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";
import ArrowTop from "../arrow-top";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "redux/modules/modal";
import AUTH from "page/common/auth";

const LayoutContainer = styled.div`
  position: relative;
`;

export default function Layout({ children }) {
  const { isOpen } = useSelector((modules) => modules.modulesModal);
  const dispatch = useDispatch();

  const { isLoading, isError, error, currentUser } = useSelector((modules) => modules.modulesAuth);

  // useEffect(() => {
  //   dispatch(modalOpen());
  // }, []);

  console.log(Object.keys(currentUser).length);
  return (
    <LayoutContainer>
      <LayoutHeader />
      {Object.keys(currentUser).length > 0 ? null : <AUTH />}
      {/* {nesting사용시 outlet} */}
      {/* <Outlet /> */}

      {children}
      <ArrowTop />
      <LayoutFooter />
    </LayoutContainer>
  );
}
