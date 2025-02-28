import React from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, username, onLogout }) => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar username={username} onLogout={onLogout} />
        <main className="p-6 mt-16 flex-grow overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
