import React, { ReactChild, ReactNode, SetStateAction, useState } from "react";
import UserContext from "../contexts/CommandPaletteContext";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
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
      <div className="h-full min-h-screen ">
        <CommandPalette />
        <Navbar />
        <div className="flex h-full min-h-screen flex-col bg-transparent pt-16">
          {/* <Header></Header> */}
          {children}
          <Footer></Footer>
        </div>
      </div>
    </UserContext.Provider>
  );
}
