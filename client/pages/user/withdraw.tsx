import React, { useContext, useState } from "react";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import InputField from "../../components/InputField";
import AuthContext from "../../contexts/AuthContext";
import useContractService from "../../services/hooks/useContractService";
import { isEmptyOrContainsSpaceOnly } from "../../services/ToolsService";

type Props = {};

const options = [
  {
    id: "WITHDRAW",
    name: "CAPITAL WITHDRAWAL",
    description: "Withdraw raised amount",
  },
  {
    id: "REFUND",
    name: "CONTRIBUTION REFUND",
    description: "Refund contributed amount",
  },
];

const Withdraw = (props: Props) => {
  const [campaignID, setCampaignID]: any = useState("");
  const [campaignOwnerAddress, setCampaignOwnerAddress]: any = useState("");

  const { withdraw, refundClaim } = useContractService();
  const { state } = useContext(AuthContext);

  // for the custom radio group
  const [selected, setSelected] = useState(options[0]);

  const checkBeforeSubmit = () => {
    if (!campaignID.match("^([0-9]+)$")) {
      console.log("Campaign id is required");
      return false;
    }

    if (
      selected.id === "REFUND" &&
      isEmptyOrContainsSpaceOnly(campaignOwnerAddress)
    ) {
      console.log("Campaign Owner Address is required");
      return false;
    }
    return true;
  };

  const handleRefund = async () => {
    if (!checkBeforeSubmit()) return;
    try {
      const receipt = await refundClaim(campaignOwnerAddress, campaignID);

      state.provider.waitForTransaction(receipt?.hash, 1).then((res: any) => {
        console.log("Refund successful");
      });
    } catch (error) {
      console.log("The giving campaign Id or Owner Address is incorrect");
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    if (!checkBeforeSubmit()) return;

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
          {selected.name}
        </span>

        <CustomRadioGroup
          selected={selected}
          setSelected={setSelected}
          options={options}
          clear={() => {
            setCampaignID("");
            setCampaignOwnerAddress("");
          }}
        />

        <InputField
          title="Campaign ID *"
          value={campaignID}
          onChangeFunction={(e: any) => {
            setCampaignID(e.target.value);
          }}
          placeholder="Enter Campaign ID"
        />
        {selected.id === "REFUND" && (
          <InputField
            title="Campaign Owner Address *"
            value={campaignOwnerAddress}
            onChangeFunction={(e: any) => {
              setCampaignOwnerAddress(e.target.value);
            }}
            placeholder="Enter Campaign Owner address"
          />
        )}
        <button
          onClick={selected.id == "REFUND" ? handleRefund : handleWithdraw}
          disabled={
            campaignID.match("^([0-9]+)$") &&
            (selected.id === "WITHDRAW" ||
              (selected.id === "REFUND" &&
                !isEmptyOrContainsSpaceOnly(campaignOwnerAddress)))
              ? false
              : true
          }
          className="mx-auto w-full max-w-[12rem] cursor-pointer select-none rounded-md border py-2 px-7 text-center font-roboto text-lg font-bold text-gray-700 shadow-sm hover:bg-slate-50  hover:shadow-md disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none"
        >
          {selected.id}
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
