import React, { SetStateAction, useState } from "react";

interface useStatePropsType {
  state: {
    isAuthenticated: boolean;
    provider: any;
    walletAddress: string;
    isSubmitBtnDisabled: boolean;
  };
  setAuthentication: Function;
  setProvider: Function;
  setWalletAddress: Function;
  setDisableSubmitBtn: Function;
}
export default React.createContext<useStatePropsType>({
  state: {
    isAuthenticated: false,
    provider: {},
    walletAddress: "",
    isSubmitBtnDisabled: false,
  },

  setAuthentication: () => {},
  setProvider: () => {},
  setWalletAddress: () => {},
  setDisableSubmitBtn: () => {},
});
