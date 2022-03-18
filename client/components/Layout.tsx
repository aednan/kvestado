import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import GlobalContextWrapper from "../contexts/GlobalContextWrapper";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
import { ImSpinner2 } from "react-icons/im";
// import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = (url: any, { shallow }: any) => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing`
      // );

      // while page is loading
      setLoaded(false);
    };
    const handleRouteChangeComplete = (url: any, { shallow }: any) => {
      // on route navigation only
      // window scrolling is disabled. This resets the scrolling within the div with ref: divRef
      divRef.current?.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      // after page loaded
      setLoaded(true);
      // console.log(
      //   `page is loaded: ${url} ${shallow ? "with" : "without"} shallow routing`
      // );
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // on route navigation only
    // window scrolling is disabled. This resets the scrolling within the div with ref: divRef
    // Router.events.on("routeChangeComplete", () => {
    //   divRef.current?.scroll({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // });

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <GlobalContextWrapper>
      {loaded ? (
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
      ) : (
        <div className="flex h-full min-h-screen w-full  bg-gray-100">
          <ImSpinner2 className="m-auto animate-[spin_1.5s_linear_infinite] cursor-default text-9xl" />
        </div>
      )}
    </GlobalContextWrapper>
  );
}
