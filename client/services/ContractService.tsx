import FundContract from "../contracts/Fund.json";
import { ethers } from "ethers";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
// import { getSigner } from "./Web3Service";
declare var window: any;

const contractAddress = FundContract.networks["5777"].address;

// const readOnlyContract: any = getReadOnlyContract();

async function getProvider() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return new ethers.providers.Web3Provider(window.ethereum);
}

export async function getReadOnlyContract() {
  const provider = await getProvider();
  return new ethers.Contract(contractAddress, FundContract.abi, provider);
}

export async function getReadWriteContract() {
  const provider = await getProvider();
  return new ethers.Contract(
    contractAddress,
    FundContract.abi,
    provider.getSigner()
  );
}

// Transactions
export async function addCampaign(
  beneficiaryAddress: string,
  campaignUrl: string,
  hasMinimumRaisedValue: boolean,
  minimumRaisedValue: number,
  expireAfter: number
) {
  try {
    const readWriteContract: any = await getReadWriteContract();
    const result = await readWriteContract?.addCampaign(
      beneficiaryAddress,
      campaignUrl,
      hasMinimumRaisedValue,
      minimumRaisedValue,
      expireAfter
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function contribute(
  campaignOwnerAddress: string,
  campaignId: number,
  contributedValueInEth: number
) {
  try {
    const provider = await getProvider();
    const readWriteContract: any = await getReadWriteContract();
    const result = await readWriteContract.contribute(
      campaignOwnerAddress,
      campaignId,
      {
        value: ethers.utils.parseEther(String(contributedValueInEth)),
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function withdraw(campaignId: number) {
  try {
    const readWriteContract: any = await getReadWriteContract();
    const provider = await getProvider();

    const result = await readWriteContract.withdraw(campaignId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function suspendCampaign(
  campaignOwnerAddress: string,
  campaignId: number
) {
  try {
    const readWriteContract: any = await getReadWriteContract();
    const provider = await getProvider();

    const result = await readWriteContract.suspendCampaign(
      campaignOwnerAddress,
      campaignId
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function refundClaim(
  campaignOwnerAddress: string,
  campaignId: number
) {
  try {
    const readWriteContract: any = await getReadWriteContract();
    const provider = await getProvider();

    const result = await readWriteContract.refundClaim(
      campaignOwnerAddress,
      campaignId
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Views
export async function getCampaign(
  campainOwnerAddress: string,
  campaignId: number
) {
  try {
    const readOnlyContract = await getReadOnlyContract();
    const result = await readOnlyContract.getCampaign(
      campainOwnerAddress,
      campaignId
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getMyContribution(campaignId: number) {
  try {
    const provider = await getProvider();
    const signerAddress = await provider.getSigner().getAddress();
    const readOnlyContract = await getReadOnlyContract();
    const result = await readOnlyContract.getContribution(
      signerAddress,
      campaignId
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getContribution(
  contributorAddress: string,
  campaignId: number
) {
  try {
    const readOnlyContract = await getReadOnlyContract();
    const result = await readOnlyContract.getContribution(
      contributorAddress,
      campaignId
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
