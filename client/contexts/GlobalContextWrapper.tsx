import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import {
  connectWallet,
  onWalletAddressChange,
  restrictedRoutes,
} from "../services/Web3Service";
import AuthContext from "./AuthContext";
import UserSettingsContext from "./UserSettingsContext";

const GlobalContextWrapper = ({ children }: { children: ReactNode }) => {
  // for Command Palette Search bar
  const [isCPaletteOpen, setCPaletteOpen] = useState<boolean>(false);
  // for user auth
  const [isAuthenticated, setAuthentication] = useState<boolean>(false);
  // web3 support
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress]: any = useState("");

  // Night mode state
  // TODO: to store the preferred settings theme mode in a database to be send back in a cookie or JWT token
  // if user is registered
  const [nModeEnabled, setNModeEnabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // on page refresh To auto connect wallet on authentication required routes
    if (router.asPath.match(restrictedRoutes)) {
      connectWallet(setWalletAddress, setProvider, setAuthentication);
    }

    // Metamask accountsChanged event
    onWalletAddressChange(setWalletAddress, setProvider, setAuthentication);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuthentication,
        setProvider,
        setWalletAddress,
        state: { walletAddress, provider, isAuthenticated },
      }}
    >
      <UserSettingsContext.Provider
        value={{
          setCPaletteOpen,
          isCPaletteOpen,
          nModeEnabled,
          setNModeEnabled,
        }}
      >
        {children}
      </UserSettingsContext.Provider>
    </AuthContext.Provider>
  );
};

export default GlobalContextWrapper;
