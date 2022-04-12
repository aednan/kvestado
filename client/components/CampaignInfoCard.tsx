import React from "react";
import { FaEthereum } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

type Props = {};

const CampaignInfoCard = (props: Props) => {
  return (
    <div className="flex flex-col space-y-4 pl-2">
      <div className="flex h-full  ">
        <FaEthereum className="my-auto h-10 min-h-[1.3rem] w-10 min-w-[1.3rem]  " />
        <p className=" my-auto h-full max-w-[12rem] overflow-x-auto font-roboto text-xl font-semibold   ">
          9.023
        </p>
      </div>
      <span className=" pl-3">
        Pledged of
        <span className="font-roboto font-black text-sky-500">
          <FaEthereum className="my-auto inline-block h-4 min-h-[1rem]" />
          13,023
        </span>{" "}
        goal
      </span>
      <div className="px-3">
        <ProgressBar progress={"40"} />
      </div>

      <span className="pl-3">
        Campaign State:{" "}
        <span className="font-bold text-sky-500">{"ACTIVE"}</span>
      </span>
    </div>
  );
};

export default CampaignInfoCard;