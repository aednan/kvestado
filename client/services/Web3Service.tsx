import { ethers } from "ethers";
import { arrayify, hashMessage } from "ethers/lib/utils";
declare var window: any;

// challenge message is requested from the backend, and be sent back to the backend after being signed,
// in exchange for a cookie or a jwt token after a successful authentication.
export async function userAuthentication(challenge: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const signedMessage = await signer.signMessage(challenge);

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
