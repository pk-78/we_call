import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Footer />
      </div>
      <Outlet />
    </div>
  );
}
