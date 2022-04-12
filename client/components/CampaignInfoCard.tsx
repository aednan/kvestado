import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import useContractService from "../services/hooks/useContractService";
import { convertFromBigNumberToNumber } from "../services/ToolsService";
import ProgressBar from "./ProgressBar";

type Props = {
  campaignId: number;
  campaignOwnerWalletAddress: string;
};

const parseEthFromBigInt = (value: any) => {
  const toNumber = convertFromBigNumberToNumber(value);
  return Math.round(Number(toNumber / Math.pow(10, 18)) * 100) / 100;
};

const CampaignInfoCard = (props: Props) => {
  const { getCampaign } = useContractService();
  const [campaignInfo, setCampaignInfo] = useState<{
    raisedValue: number | string;
    minimumRaisedValue: number | string;
    state: string;
  }>();

  const getPercentage = () => {
    if (
      campaignInfo?.minimumRaisedValue !== 0 &&
      typeof campaignInfo?.minimumRaisedValue === "number" &&
      typeof campaignInfo?.raisedValue === "number"
    ) {
      return (
        (campaignInfo?.raisedValue / campaignInfo?.minimumRaisedValue) * 100
      );
    }
    return "";
  };

  useEffect(() => {
    getCampaign(props.campaignOwnerWalletAddress, props.campaignId).then(
      (res: any) => {
        // console.log(res?.raisedValue);
        // console.log(res?.minimumRaisedValue);
        // console.log(res?.state);
        setCampaignInfo({
          raisedValue: parseEthFromBigInt(res?.raisedValue),
          minimumRaisedValue: parseEthFromBigInt(res?.minimumRaisedValue),
          state:
            res?.state === 0
              ? "ACTIVE"
              : res?.state === 1
              ? "CLOSED"
              : res?.state === 2
              ? "SUSPENDED"
              : res?.state === 3
              ? "EXPIRED"
              : "NONE",
        });
      }
    );
  }, []);

  return (
    <div className="flex flex-col space-y-4 pl-2">
      <div className="flex h-full  ">
        <FaEthereum className="my-auto h-10 min-h-[1.3rem] w-10 min-w-[1.3rem]  " />
        <p className=" my-auto h-full max-w-[12rem] overflow-x-auto font-roboto text-xl font-semibold   ">
          {campaignInfo?.raisedValue}
        </p>
      </div>
      <span className=" pl-3">
        Pledged of
        <div className="inline-block max-w-[5rem] overflow-clip text-sky-500">
          <FaEthereum className="inline-block max-h-[1.1rem] min-h-[1.1rem]" />
          <span className=" inline-block  font-roboto font-black ">
            {campaignInfo?.minimumRaisedValue}
          </span>
        </div>{" "}
        goal
      </span>

      <div className="px-3">
        <ProgressBar progress={getPercentage()} />
      </div>

      <span className="pl-3">
        Campaign State:{" "}
        <span className="font-bold text-sky-500">{campaignInfo?.state}</span>
      </span>
    </div>
  );
};

export default CampaignInfoCard;
