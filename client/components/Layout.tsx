import React, { ReactChild, ReactNode, SetStateAction, useState } from "react";
import UserContext from "../contexts/CommandPaletteContext";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
import Header from "./Header";
// import Header from "./Header";
import Navbar from "./Navbar";

interface useStatePropsType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Layout({ children }: { children: ReactNode }) {
  // for Command Palette Search bar
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ setIsOpen, isOpen }}>
      <div className="fixed z-0 h-full min-h-screen w-full">
        <CommandPalette />
        <Navbar />
        <div className="-z-20 flex h-full w-full flex-col overflow-auto ">
          {/* <Header /> */}
          {children}
          <Footer />
        </div>
      </div>
    </UserContext.Provider>
  );
}
