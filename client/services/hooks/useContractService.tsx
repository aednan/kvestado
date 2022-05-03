import { ethers } from "ethers";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import KvestadoContract from "../../contracts/Kvestado.json";

type Props = {};

// localhost network 5777
// rinkeby 4
export default function useContractService(props?: Props) {
  const contractAddress = KvestadoContract.networks["4"].address;

  let readOnlyContractInstance: any = undefined;
  let readWriteContractInstance: any = undefined;

  const { state } = useContext(AuthContext);

  async function getReadOnlyContract() {
    if (readOnlyContractInstance === undefined) {
      readOnlyContractInstance = new ethers.Contract(
        contractAddress,
        KvestadoContract.abi,
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
        KvestadoContract.abi,
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
        ethers.utils.parseEther(String(minimumRaisedValue)),
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
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function withdraw(campaignId: number) {
    try {
      const readWriteContract: any = await getReadWriteContract();
      const result = await readWriteContract.withdraw(campaignId);
      console.log(result);
      return result;
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
      return result;
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
      return result;
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
      return result;
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
      return result;
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
      return result;
    } catch (error) {
      throw error;
    }
  }

  const getLogs = async () => {
    // https://docs.soliditylang.org/en/v0.8.4/abi-spec.html#events
    // topics[0]: keccak(EVENT_NAME+"("+EVENT_ARGS.map(canonical_type_of).join(",")+")")
    // 0xd8762e1294e388f7530291bd0b5b3c98c73b1a82b4b8deeccbe4ff126f155a58 = MyCampaign event
    // Retrieve the last campaign id from the event topic
    var filter = {
      fromBlock: 0,
      topics: [
        "0xd8762e1294e388f7530291bd0b5b3c98c73b1a82b4b8deeccbe4ff126f155a58",
      ],
      toBlock: "latest",
    };
    return state.provider.getLogs(filter);
  };

  const parseEvents = (events: any) => {
    let abi = KvestadoContract.abi;
    let iface = new ethers.utils.Interface(abi);
    return events.map((log: any) => {
      return iface.parseLog(log);
    });
  };

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
    getLogs,
    parseEvents,
  };
}
