import React from "react";
import LayoutFooter from "../footer";
import LayoutHeader from "../header";

export default function Layout({ children }) {
  return (
    <div>
      <LayoutHeader />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  );
}
