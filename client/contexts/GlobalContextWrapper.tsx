import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import useWeb3Service from "../services/hooks/useWeb3Service";
import AuthContext from "./AuthContext";
import UserSettingsContext from "./UserSettingsContext";

const GlobalContextWrapper = ({ children }: { children: ReactNode }) => {
  // for Command Palette Search bar
  const [isCPaletteOpen, setCPaletteOpen] = useState<boolean>(false);
  // for user auth
  const [isAuthenticated, setAuthentication] = useState<boolean>(false);
  // for user auth
  const [isSubmitBtnDisabled, setDisableSubmitBtn] = useState<boolean>(false);
  // web3 support
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress]: any = useState("");
  // scroll bottom detection
  const [bottomScrollDetected, setBottomScrollDetected] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // see layout
  const [scrollResetToShow, setScrollResetToShow] = useState(false);

  const { connectWallet, restrictedRoutes } = useWeb3Service();

  // Night mode state
  // TODO: to store the preferred settings theme mode in a database to be send back in a cookie or JWT token
  // if user is registered
  const [nModeEnabled, setNModeEnabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // on page refresh To auto connect wallet on authentication required routes
    if (router.asPath.match(restrictedRoutes) && !isSubmitBtnDisabled) {
      // setDisableSubmitBtn(true);
      connectWallet();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuthentication,
        setProvider,
        setWalletAddress,
        setDisableSubmitBtn,
        setUserInfo,
        state: {
          walletAddress,
          provider,
          isAuthenticated,
          isSubmitBtnDisabled,
          userInfo,
        },
      }}
    >
      <UserSettingsContext.Provider
        value={{
          isCPaletteOpen,
          setCPaletteOpen,
          nModeEnabled,
          setNModeEnabled,
          bottomScrollDetected,
          setBottomScrollDetected,
          setScrollResetToShow,
          scrollResetToShow,
        }}
      >
        {children}
      </UserSettingsContext.Provider>
    </AuthContext.Provider>
  );
};

export default GlobalContextWrapper;
