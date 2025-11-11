import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "90px" }}>
        <Outlet /> {/* This is where the page content will render */}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
