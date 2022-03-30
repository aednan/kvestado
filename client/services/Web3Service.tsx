import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";

declare var window: any;

// authentication required for these routes
export const restrictedRoutes = "^/user/.*|^/campaigns/create$";

// Errors will be caught at connectWallet level
// challenge message is requested from the backend, and be sent back to the backend after being signed,
// in exchange for a cookie or a jwt token after a successful authentication.
export async function userAuthentication(provider: any) {
  const signerAddress = await provider.getSigner().getAddress();
  let signedMessage: any = "";

  const challenge = await userRegistration(
    "http://localhost:8080/request_challenge",
    signerAddress
  );

  if (challenge !== "") {
    // signedMessage = await window.ethereum.request({
    //   method: "personal_sign",
    //   params: [challenge, signerAddress],
    // });

    signedMessage = await provider.getSigner().signMessage(challenge);
    if (
      signerAddress === ethers.utils.verifyMessage(challenge, signedMessage)
    ) {
      // user authenticated
      // TODO: authentication should be done also in the backend
      // if user doesn't exist, account will be created with the wallet address
      console.log(true);
      console.log(challenge);
      console.log(signedMessage);
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
// async function login(url: string, walletAddress: string, signedMessage: string) {
//   const response = await axios.post(url, {
//     wallet_address: walletAddress,
//   });
//   return response.data;
// }

// Metamask events, accounts
export async function onWalletAddressChange(
  setWalletAddress: Function,
  setProvider: Function,
  setAuthentication: Function,
  setDisableSubmitBtn: Function,
  state: any
) {
  window.ethereum.on("accountsChanged", (accounts: any) => {
    if (accounts.length > 0) {
      // setWalletAddress(accounts[0]);
      connectWallet(
        setWalletAddress,
        setProvider,
        setAuthentication,
        setDisableSubmitBtn,
        state
      );
    } else {
      logout(setAuthentication, setProvider, setWalletAddress);
    }
  });
}
// networkId
export async function onNetworkChange(a: Function) {
  window.ethereum.on("networkChanged", a);
}

export async function connectWallet(
  setWalletAddress: Function,
  setProvider: Function,
  setAuthentication: Function,
  setDisableSubmitBtn: Function,
  state: any
) {
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
        setAuthentication(true);
        // To reconnect user after page refresh if already authenticated
        if (!localStorage.getItem("Authenticated")) {
          localStorage.setItem("Authenticated", "true");
        }
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
    console.log("here");
    if (Router.asPath.match(restrictedRoutes) && error?.code !== -32002) {
      Router.push("/");
    }
    console.log(error);
  }
  setDisableSubmitBtn(false);
}

export async function checkIfConnected(
  setWalletAddress: Function,
  setProvider: Function,
  setAuthentication: Function,
  setDisableSubmitBtn: Function,
  state: any
) {
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts > 0 && localStorage.getItem("Authenticated")) {
    connectWallet(
      setWalletAddress,
      setProvider,
      setAuthentication,
      setDisableSubmitBtn,
      state
    );
    return true;
  }
  logout(setAuthentication, setProvider, setWalletAddress);
  return false;
}

export function logout(
  setAuthentication: any,
  setProvider: any,
  setWalletAddress: any
) {
  // reset state
  setAuthentication(false);
  setProvider({});
  setWalletAddress("");
  // clear cookies or jwt token

  // redirect user to home page only when route required authentication
  if (Router.asPath.match(restrictedRoutes)) {
    Router.push("/");
  }

  // clear local storage authentication
  localStorage.clear();
}
