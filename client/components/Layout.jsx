import React, { useState } from "react";
import UserContext from "../contexts/CommandPaletteContext";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
// import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  // for Command Palette Search bar
  const [isOpen, setIsOpen] = useState(false);

  // const onChangeSetIsOpen = (isOpenInput) => {
  //   setIsOpen(isOpenInput);
  // };

  return (
    <UserContext.Provider value={{ setIsOpen, isOpen }}>
      <div className="h-full min-h-screen ">
        <CommandPalette />
        <Navbar />
        <div className="flex h-full min-h-screen flex-col bg-green-300 pt-16">
          {/* <Header></Header> */}
          {children}
          <Footer></Footer>
        </div>
      </div>
    </UserContext.Provider>
  );
}
