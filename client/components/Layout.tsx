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
import UserSettingsContext from "../contexts/UserSettingsContext";
import { resetScroll } from "../services/ToolsService";
import ResetScrollButton from "./ResetScrollButton";

export default function Layout({ children }: { children: ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);

  const { scrollResetToShow, setScrollResetToShow } =
    useContext(UserSettingsContext);

  const { state } = useContext(AuthContext);

  const { connectWallet, restrictedRoutes } = useWeb3Service();

  useEffect(() => {
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
      resetScroll(divRef);
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
  }, [
    connectWallet,
    restrictedRoutes,
    router.events,
    state.isSubmitBtnDisabled,
  ]);

  return !loaded ||
    (router.asPath.match(restrictedRoutes) && !state.isAuthenticated) ? (
    <LoadingSpinner />
  ) : (
    <div className="fixed z-0 h-full min-h-screen w-full">
      <ResetScrollButton divRef={divRef} />
      <CommandPalette />
      <Navbar />
      <div
        // onScroll={handleScroll}
        ref={divRef}
        className="-z-20 flex h-full w-full flex-col overflow-auto scroll-smooth pt-16 "
      >
        {children}
        <Footer />
      </div>
    </div>
  );
}
