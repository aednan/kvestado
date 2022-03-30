import React, { SetStateAction, useState } from "react";

interface useStatePropsType {
  state: any;
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
