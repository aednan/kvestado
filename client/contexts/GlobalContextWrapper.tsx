import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { connectWallet, onWalletAddressChange } from "../services/Web3Service";
import AuthContext from "./AuthContext";
import UserContext from "./CommandPaletteContext";

const GlobalContextWrapper = ({ children }: { children: ReactNode }) => {
  // for Command Palette Search bar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for user auth
  const [isAuthenticated, setAuthentication] = useState(false);
  // web3 support
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress]: any = useState("");

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
      <UserContext.Provider value={{ setIsOpen, isOpen }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default GlobalContextWrapper;
