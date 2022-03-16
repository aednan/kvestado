import { Router } from "next/router";
import React, { ReactNode, SetStateAction, useEffect, useRef } from "react";
import GlobalContextWrapper from "../contexts/GlobalContextWrapper";
// import UserContext from "../contexts/CommandPaletteContext";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
// import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // on route navigation only
    // window scrolling is disabled. This resets the scrolling within the div with ref: divRef
    Router.events.on("routeChangeComplete", () => {
      divRef.current?.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  });

  // // for Command Palette Search bar
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // <UserContext.Provider value={{ setIsOpen, isOpen }}>
    <GlobalContextWrapper>
      <div className="fixed z-0 h-full min-h-screen w-full">
        <CommandPalette />
        <Navbar />
        <div
          ref={divRef}
          className="-z-20 flex h-full w-full flex-col overflow-auto scroll-smooth "
        >
          {/* <Header /> */}
          {children}
          <Footer />
        </div>
      </div>
    </GlobalContextWrapper>
    // </UserContext.Provider>
  );
}
