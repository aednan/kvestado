import React from "react";

interface useStatePropsType {
  state: {
    isAuthenticated: boolean;
    provider: any;
    walletAddress: string;
    isSubmitBtnDisabled: boolean;
    userInfo: {
      username?: string;
      email?: string;
      about?: string;
      pictureUrl?: string;
      joined?: string;
      nightMode?: boolean;
    };
  };
  setAuthentication: Function;
  setProvider: Function;
  setWalletAddress: Function;
  setDisableSubmitBtn: Function;
  setUserInfo: Function;
}
export default React.createContext<useStatePropsType>({
  state: {
    isAuthenticated: false,
    provider: {},
    walletAddress: "",
    isSubmitBtnDisabled: false,
    userInfo: {},
  },

  setAuthentication: () => {},
  setProvider: () => {},
  setWalletAddress: () => {},
  setDisableSubmitBtn: () => {},
  setUserInfo: () => {},
});
