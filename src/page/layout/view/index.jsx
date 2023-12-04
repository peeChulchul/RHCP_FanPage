import React, { useEffect } from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";
import ArrowTop from "../arrow-top";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AUTH from "page/common/auth";
import { __getAuth, authClear } from "redux/modules/auth";
import { Loading } from "page/common/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LayoutContainer = styled.div`
  position: relative;
`;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { isLoading, error, currentUser, message, status } = useSelector((modules) => modules.modulesAuth);
  const { error: letterError, message: letterMessage } = useSelector((modules) => modules.modulesLetters);

  const sessionAuth = sessionStorage.getItem("AUTH");

  useEffect(() => {
    const sessionAUTH = JSON.parse(sessionStorage.getItem("AUTH"));
    if (sessionAUTH === null) {
      dispatch(authClear());
    }

    if (sessionAUTH) {
      const { accessToken } = JSON.parse(sessionStorage.getItem("AUTH"));
      dispatch(__getAuth(accessToken));
    }
  }, [dispatch, currentUser.accessToken, sessionAuth]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (letterError) {
      toast.success(letterError);
    }
  }, [letterError]);
  useEffect(() => {
    if (letterMessage) {
      toast.success(letterMessage);
    }
  }, [letterMessage]);

  return (
    <LayoutContainer>
      <LayoutHeader />
      <ToastContainer />
      {Object.keys(currentUser).length > 0 ? null : <AUTH />}
      {/* {isLoading ? <Loading /> : <>{Object.keys(currentUser).length > 0 ? null : <AUTH />}</>} */}

      {isLoading ? <Loading /> : children}
      {/* {nesting사용시 outlet} */}
      {/* <Outlet /> */}
      {/* {children} */}
      <ArrowTop />
      <LayoutFooter />
    </LayoutContainer>
  );
}
