import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { connectWallet, onWalletAddressChange } from "../services/Web3Service";
import AuthContext from "./AuthContext";
import UserSettingsContext from "./UserSettingsContext";

const GlobalContextWrapper = ({ children }: { children: ReactNode }) => {
  // for Command Palette Search bar
  const [isCPaletteOpen, setCPaletteOpen] = useState<boolean>(false);
  // for user auth
  const [isAuthenticated, setAuthentication] = useState(false);
  // web3 support
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress]: any = useState("");

  // Night mode state
  const [nModeEnabled, setNModeEnabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.match("^/settings$|^/profile$")) {
      connectWallet(setWalletAddress, setProvider, setAuthentication);
    }
    onWalletAddressChange(setWalletAddress, setAuthentication);
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
