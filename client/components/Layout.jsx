import React from "react";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
// import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="h-full min-h-screen ">
      <CommandPalette />
      <Navbar />
      <div className="flex h-full min-h-screen flex-col bg-green-300 pt-16">
        {/* <Header></Header> */}
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
}
