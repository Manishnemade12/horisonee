import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex w-full min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
