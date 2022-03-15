import { ethers } from "ethers";
import { arrayify, hashMessage } from "ethers/lib/utils";
declare var window: any;

// challenge message is requested from the backend, and be sent back to the backend after being signed,
// in exchange for a cookie or a jwt token after a successful authentication.
export async function userAuthentication(challenge: string) {
  try {
    const signer = await getSigner();
    const signerAddress = await signer?.getAddress();
    let signedMessage: any = "";
    signedMessage = await signer?.signMessage(challenge);

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

export async function getWalletAddress() {
  try {
    // const signer = provider.getSigner();
    const signer = await getSigner();
    const signerAddress = await signer?.getAddress();
    return signerAddress;
  } catch (error) {
    console.log(error);
  }
}

async function getSigner() {
  try {
    // Request account access if needed
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Accounts now exposed, use them
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  } catch (error) {
    // User denied account access
    console.log(error);
    return null;
  }
}

// Metamask events, accounts
export async function onWalletAddressChange(a: Function) {
  window.ethereum.on("accountsChanged", a);
}
// networkId
export async function onNetworkChange(a: Function) {
  window.ethereum.on("networkChanged", a);
}
