import React from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </>
  );
}
