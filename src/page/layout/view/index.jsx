import React, { useEffect } from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";
import ArrowTop from "../arrow-top";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "redux/modules/modal";
import AUTH from "page/common/auth";
import { __getAuth } from "redux/modules/auth";

const LayoutContainer = styled.div`
  position: relative;
`;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { isLoading, isError, error, currentUser } = useSelector((modules) => modules.modulesAuth);

  useEffect(() => {
    const sessionAUTH = JSON.parse(sessionStorage.getItem("AUTH"));
    if (sessionAUTH === null) return;

    if (sessionAUTH) {
      const { accessToken } = JSON.parse(sessionStorage.getItem("AUTH"));
      dispatch(__getAuth(accessToken));
    }
  }, [dispatch, currentUser.accessToken]);

  return (
    <LayoutContainer>
      {Object.keys(currentUser).length > 0 ? null : <AUTH />}
      <LayoutHeader />
      {/* {nesting사용시 outlet} */}
      {/* <Outlet /> */}
      {children}
      <ArrowTop />
      <LayoutFooter />
    </LayoutContainer>
  );
}
