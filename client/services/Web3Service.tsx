import { ethers } from "ethers";
import { arrayify, hashMessage } from "ethers/lib/utils";
declare var window: any;

export async function userAuthentication() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const flatSig = await signer.signMessage("hallo x");

    // public key
    const pkey = ethers.utils.recoverPublicKey(
      arrayify(hashMessage("hallo x")),
      flatSig
    );
    console.log(pkey);
    // const ppkey = ethers.utils.computePublicKey(pkey);
    // console.log(ppkey);

    console.log(flatSig);
    // hashed message
    console.log(hashMessage("hallo x"));

    const signA = ethers.utils.splitSignature(flatSig);
    console.log(signA);

    console.log(signerAddress);

    if (signerAddress === ethers.utils.verifyMessage("hallo x", flatSig)) {
      // user authenticated
      // TODO: authentication should be done also in the backend
      console.log(true);
    }
  } catch (e: any) {
    // console.log(e.message);
  }
}
