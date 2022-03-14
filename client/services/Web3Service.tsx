import { ethers } from "ethers";
import { arrayify, hashMessage } from "ethers/lib/utils";
declare var window: any;

export async function userAuthentication() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const flatSig = await signer.signMessage("message");

    //public key
    // const pkey = ethers.utils.recoverPublicKey(
    //     arrayify(hashMessage("message")),
    //     flatSig
    //   );
    // console.log(pkey);
    //
    console.log(flatSig);
    // hashed message
    console.log(hashMessage("message"));

    if (signerAddress === ethers.utils.verifyMessage("message", flatSig)) {
      // user authenticated
      // TODO: authentication should be done also in the backend
      console.log(true);
    }
  } catch (e: any) {
    // console.log(e.message);
  }
}
