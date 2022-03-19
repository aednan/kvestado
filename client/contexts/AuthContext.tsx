import React, { SetStateAction, useState } from "react";

interface useStatePropsType {
  state: any;
  setAuthentication: Function;
  setProvider: Function;
  setWalletAddress: Function;
}
export default React.createContext<useStatePropsType>({
  state: {
    isAuthenticated: false,
    provider: {},
    walletAddress: "",
  },

  setAuthentication: () => {},
  setProvider: () => {},
  setWalletAddress: () => {},
});
