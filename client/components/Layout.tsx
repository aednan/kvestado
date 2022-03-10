import { Router } from "next/router";
import React, {
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  // for Command Palette Search bar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ setIsOpen, isOpen }}>
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
    </UserContext.Provider>
  );
}
