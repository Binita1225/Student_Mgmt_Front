import React from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { useLocation } from "react-router";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const noLayoutPages = ["/login", "/signup"];

  const isAuthPage = noLayoutPages.includes(location.pathname);
  return (
    <div className="flex">
      {!isAuthPage && <SideBar />}
      <div
        className={`flex-1 ${
          !isAuthPage ? "ml-64" : ""
        } flex flex-col min-h-screen`}
      >
        {!isAuthPage && <Navbar />}
        <main className="p-6 mt-16 flex-grow overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
