import React from "react";
import InputField from "../../components/InputField";

type Props = {};

const Withdraw = (props: Props) => {
  return (
    <div className="my-16 flex justify-center">
      <div className=" flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <span className="mb-20 text-center font-roboto text-4xl font-black">
          Capital Withdrawal
        </span>
        <InputField
          title="Campaign ID *"
          value=""
          disabled={false}
          onChangeFunction={() => {}}
          placeholder="Enter your campaign ID"
        />
        <span
          //   onClick={saveToApi}
          className="mx-auto w-full max-w-[12rem] cursor-pointer select-none rounded-md border py-2 px-7 text-center font-roboto text-lg  font-bold text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md"
        >
          Withdraw
        </span>
      </div>
    </div>
  );
};

export default Withdraw;
