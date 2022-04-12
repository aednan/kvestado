import { ethers } from "ethers";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import FundContract from "../../contracts/Fund.json";

type Props = {};

export default function useContractService(props?: Props) {
  const contractAddress = FundContract.networks["5777"].address;

  let readOnlyContractInstance: any = undefined;
  let readWriteContractInstance: any = undefined;

  const { state } = useContext(AuthContext);

  async function getReadOnlyContract() {
    if (readOnlyContractInstance === undefined) {
      readOnlyContractInstance = new ethers.Contract(
        contractAddress,
        FundContract.abi,
        state.provider
      );
      return readOnlyContractInstance;
    }
    return readOnlyContractInstance;
  }

  async function getReadWriteContract() {
    if (readWriteContractInstance === undefined) {
      readWriteContractInstance = new ethers.Contract(
        contractAddress,
        FundContract.abi,
        state.provider.getSigner()
      );
      return readWriteContractInstance;
    }
    return readWriteContractInstance;
  }

  // Transactions
  async function addCampaign(
    beneficiaryAddress: string,
    campaignUrl: string,
    hasMinimumRaisedValue: boolean,
    minimumRaisedValue: number,
    expireAfter: number
  ) {
    try {
      const readWriteContract: any = await getReadWriteContract();
      const result = await readWriteContract.addCampaign(
        beneficiaryAddress,
        campaignUrl,
        hasMinimumRaisedValue,
        minimumRaisedValue,
        expireAfter
      );
      return result;
      // console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async function contribute(
    campaignOwnerAddress: string,
    campaignId: number,
    contributedValueInEth: number
  ) {
    try {
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
      throw error;
    }
  }

  async function withdraw(campaignId: number) {
    try {
      const readWriteContract: any = await getReadWriteContract();
      const result = await readWriteContract.withdraw(campaignId);
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async function suspendCampaign(
    campaignOwnerAddress: string,
    campaignId: number
  ) {
    try {
      const readWriteContract: any = await getReadWriteContract();
      const result = await readWriteContract.suspendCampaign(
        campaignOwnerAddress,
        campaignId
      );
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async function refundClaim(campaignOwnerAddress: string, campaignId: number) {
    try {
      const readWriteContract: any = await getReadWriteContract();
      const result = await readWriteContract.refundClaim(
        campaignOwnerAddress,
        campaignId
      );
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  // Views
  async function getCampaign(campaignOwnerAddress: string, campaignId: number) {
    try {
      const readOnlyContract = await getReadOnlyContract();
      const result = await readOnlyContract.getCampaign(
        campaignOwnerAddress,
        campaignId
      );
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async function getMyContribution(campaignId: number) {
    try {
      const signerAddress = await state.provider.getSigner().getAddress();
      const readOnlyContract = await getReadOnlyContract();
      const result = await readOnlyContract.getContribution(
        signerAddress,
        campaignId
      );
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async function getContribution(
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
      throw error;
    }
  }

  return {
    addCampaign,
    contribute,
    withdraw,
    suspendCampaign,
    refundClaim,
    getCampaign,
    getMyContribution,
    getContribution,
    getReadOnlyContract,
  };
}
