import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
declare var window: any;
const restrictedRoutes = "^/user/.*|^/campaigns/create$";
axios.defaults.withCredentials = true;

type Props = {};

export const useWeb3Service = (props?: Props) => {
  const {
    state,
    setAuthentication,
    setProvider,
    setWalletAddress,
    setDisableSubmitBtn,
  } = useContext(AuthContext);
  const route = useRouter();

  //**** */

  // Errors will be caught at connectWallet level
  // challenge message is requested from the backend, and be sent back to the backend after being signed,
  // in exchange for a cookie or a jwt token after a successful authentication.
  async function userAuthentication(provider: any) {
    const signerAddress = await provider.getSigner().getAddress();
    let signedMessage: any = "";

    const challenge = await userRegistration(
      "http://localhost:8080/request_challenge",
      signerAddress
    );
    if (challenge !== "") {
      signedMessage = await window.ethereum.request({
        method: "personal_sign",
        params: [challenge, signerAddress],
      });
      if (
        signerAddress === ethers.utils.verifyMessage(challenge, signedMessage)
      ) {
        // user authenticated
        // TODO: authentication should be done also in the backend
        // if user doesn't exist, account will be created with the wallet address
        // console.log(true);
        // console.log(challenge);
        console.log(signedMessage);

        await login(
          "http://localhost:8080/login",
          signerAddress,
          signedMessage
        );
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        console.log(response);

        return true;
      }
    }
    return false;
  }

  // Errors will be caught at connectWallet level
  async function userRegistration(url: string, walletAddress: string) {
    const response = await axios.get(url, {
      params: { wallet_address: walletAddress },
    });
    return response.data;
  }

  async function login(
    url: string,
    walletAddress: string,
    signedMessage: string
  ) {
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${btoa(walletAddress + ":" + signedMessage)}`,
      },
      withCredentials: true,
    });
    return response.data;
  }

  // Metamask events, accounts
  async function onWalletAddressChange() {
    window.ethereum.on("accountsChanged", (accounts: any) => {
      // console.log(state.walletAddress);
      // if (accounts.length > 0) {
      //   logout();
      //   connectWallet();
      // } else {

      if (localStorage.getItem("Authenticated")) {
        const logout = async () => {
          await logout();
        };
      }

      // }
    });
  }
  // networkId
  async function onNetworkChange(a: Function) {
    window.ethereum.on("networkChanged", a);
  }

  async function connectWallet() {
    // TODO: onConnect the user should sign the message received by the backend

    // Metamask is present, try connect wallet
    setDisableSubmitBtn(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setProvider(provider);
        }
        //

        if (
          !localStorage.getItem("Authenticated") &&
          (await userAuthentication(provider))
        ) {
          // setDisableSubmitBtn(true);
          // const auth = ;
          // if (auth === true) {
          setAuthentication(true);
          // To reconnect user after page refresh if already authenticated
          if (!localStorage.getItem("Authenticated")) {
            localStorage.setItem("Authenticated", "true");
          }
          // }
        } else if (localStorage.getItem("Authenticated")) {
          setAuthentication(true);
        }

        //
      } else {
        // TODO alert "need a wallet provider to be installed"
        console.log("wallet Provider is needed");
      }
    } catch (error: any) {
      // if the route require authentication && user decline connection
      // redirect to home page

      if (route.asPath.match(restrictedRoutes) && error?.code !== -32002) {
        route.push("/");
      }
      console.log(error);
    }
    setDisableSubmitBtn(false);
  }

  async function checkIfConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts > 0 && localStorage.getItem("Authenticated")) {
      connectWallet();
      return true;
    }
    if (localStorage.getItem("Authenticated")) {
      await logout();
    }
    return false;
  }

  async function logout() {
    try {
      // clear cookies or jwt token
      await backendLogout("http://localhost:8080/logout");

      // reset state
      setAuthentication(false);
      setProvider({});
      setWalletAddress("");
      setDisableSubmitBtn(false);

      // redirect user to home page only when route required authentication
      if (route.asPath.match(restrictedRoutes)) {
        route.push("/");
      }

      // clear local storage authentication
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  async function backendLogout(url: string) {
    await axios.post(url);
  }

  //**** */

  useEffect(() => {
    // check user session if logged in
  }, []);

  return {
    userRegistration,
    restrictedRoutes,
    logout,
    checkIfConnected,
    connectWallet,
    onNetworkChange,
    onWalletAddressChange,
    userAuthentication,
  };
};
