import { ethers } from "ethers";
import { arrayify, hashMessage } from "ethers/lib/utils";
import Router from "next/router";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
declare var window: any;

// challenge message is requested from the backend, and be sent back to the backend after being signed,
// in exchange for a cookie or a jwt token after a successful authentication.
export async function userAuthentication(challenge: string, provider: any) {
  // const { state } = useContext(AuthContext);

  try {
    const signerAddress = await provider.signer?.getAddress();
    let signedMessage: any = "";
    signedMessage = await provider.signer?.signMessage(challenge);

    // public key
    // const pkey = ethers.utils.recoverPublicKey(
    //   arrayify(hashMessage(challenge)),
    //   signature
    // );
    // console.log(pkey);
    // const ppkey = ethers.utils.computePublicKey(pkey);
    // console.log(ppkey);

    // console.log(signedMessage);
    // hashed message
    // console.log(hashMessage(challenge));

    // const signA = ethers.utils.splitSignature(signedMessage);
    // console.log(signA);

    // console.log(signerAddress);

    if (
      signerAddress === ethers.utils.verifyMessage(challenge, signedMessage)
    ) {
      // user authenticated
      // TODO: authentication should be done also in the backend
      // if user doesn't exist, account will be created with the wallet address
      console.log(true);
    }
  } catch (e: any) {
    // console.log(e.message);
  }
}

// export async function getWalletAddress(
//   setWalletAddress: Function,
//   provider: any
// ) {
//   try {
//     const signerAddress = await provider.signer?.getAddress();
//     setWalletAddress(signerAddress ? signerAddress : "");
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function setWalletSigner() {
//   try {
//     // Request account access if needed
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     // Accounts now exposed, use them
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     setProvider(provider);
//     // return provider.getSigner();
//   } catch (error) {
//     // User denied account access
//     console.log(error);
//     // return null;
//   }
// }

// Metamask events, accounts
export async function onWalletAddressChange(
  setWalletAddress: Function,
  setProvider: Function,
  setAuthentication: Function
) {
  window.ethereum.on("accountsChanged", (accounts: any) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
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
  setAuthentication: Function
) {
  // TODO: onConnect the user should sign the message received by the backend

  // Metamask is present
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setAuthentication(true);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    } else {
      // TODO alert "need a wallet provider to be installed"
      console.log("wallet Provider is needed");
    }
  } catch (error) {
    console.log(error);
  }
}

export function logout(
  setAuthentication: Function,
  setProvider: Function,
  setWalletAddress: Function
) {
  // reset state
  setAuthentication(false);
  setProvider({});
  setWalletAddress("");
  // clear cookies or jwt token

  // redirect user to home page only when route required authentication
  // TODO: filter routes
  Router.push("/");
}
