import { useRouter } from "next/router";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";
// import Header from "./Header";
import Navbar from "./Navbar";
import AuthContext from "../contexts/AuthContext";
import useWeb3Service from "../services/hooks/useWeb3Service";
import LoadingSpinner from "./LoadingSpinner";

export default function Layout({ children }: { children: ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);
  const { state } = useContext(AuthContext);

  const {
    checkIfConnected,
    onWalletAddressChange,
    connectWallet,
    restrictedRoutes,
  } = useWeb3Service();

  useEffect(() => {
    if (!state.isSubmitBtnDisabled) {
      // after refresh: Auto connects to the wallet if the user is already connected
      checkIfConnected();
    }
    // Metamask accountsChanged event
    onWalletAddressChange();

    const handleRouteChangeStart = (url: any, { shallow }: any) => {
      // To auto connect wallet on authentication required routes

      if (url.match(restrictedRoutes) && !state.isSubmitBtnDisabled) {
        connectWallet();
      }

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
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return !loaded ||
    (router.asPath.match(restrictedRoutes) && !state.isAuthenticated) ? (
    // <div className="flex h-full min-h-screen w-full  bg-gray-100">
    //   <ImSpinner2 className="m-auto animate-[spin_1.5s_linear_infinite] cursor-default text-9xl" />
    // </div>
    <LoadingSpinner />
  ) : (
    <div className="fixed z-0 h-full min-h-screen w-full">
      <CommandPalette />
      <Navbar />
      <div
        ref={divRef}
        className="-z-20 flex h-full w-full flex-col overflow-auto scroll-smooth pt-16 "
      >
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
    </div>
  );
}
