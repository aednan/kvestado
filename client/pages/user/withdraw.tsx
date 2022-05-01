import React, { useContext, useState } from "react";
import InputField from "../../components/InputField";
import AuthContext from "../../contexts/AuthContext";
import useContractService from "../../services/hooks/useContractService";

type Props = {};

const Withdraw = (props: Props) => {
  const [campaignID, setCampaignID]: any = useState("");

  const { withdraw } = useContractService();
  const { state } = useContext(AuthContext);

  const handleWithdraw = async () => {
    if (!campaignID.match("^([0-9]+)$")) {
      console.log("Campaign id is required");
      return;
    }
    try {
      const receipt = await withdraw(campaignID);

      state.provider.waitForTransaction(receipt?.hash, 1).then((res: any) => {
        console.log("Withdrawal successful");
      });
    } catch (error) {
      console.log("The giving campaign id is incorrect");
      console.log(error);
    }
  };

  return (
    <div className="my-16 flex justify-center">
      <div className=" flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <span className="mb-8 self-center border-y-2 py-3 text-center font-roboto text-4xl font-thin tracking-tight text-gray-900 ring-0">
          CAPITAL WITHDRAWAL
        </span>
        <InputField
          title="Campaign ID *"
          value={campaignID}
          onChangeFunction={(e: any) => {
            setCampaignID(e.target.value);
          }}
          placeholder="Enter your campaign ID"
        />
        <button
          onClick={handleWithdraw}
          disabled={campaignID.match("^([0-9]+)$") ? false : true}
          className="mx-auto w-full max-w-[12rem] cursor-pointer select-none rounded-md border py-2 px-7 text-center font-roboto text-lg font-bold text-gray-700 shadow-sm hover:bg-slate-50  hover:shadow-md disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
