import React from "react";
import { FaEthereum } from "react-icons/fa";
import { RiExchangeFundsFill } from "react-icons/ri";

type Props = {
  contributions: [
    {
      campaignId: number;
      campaignOwnerWalletAddress: string;
      amount: number;
    }
  ];
};

const ContributionCard = (props: Props) => {
  return (
    <>
      {props.contributions && props.contributions.length > 0 && (
        <div className="lg:flex-cols-3 mt-6 flex flex-wrap justify-center gap-y-10   gap-x-6 ">
          {props.contributions.map((contribution: any) => (
            <li
              key={contribution.campaignId}
              className="flex min-w-[24rem] max-w-[24rem] rounded-md border-2 py-6 shadow-md"
            >
              {/* <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  border-gray-200">
                <RiExchangeFundsFill className="h-full w-full text-sky-800" />
              </div> */}

              <div className="ml-4 flex flex-1 flex-col ">
                <div>
                  <div className="flex justify-between  font-roboto text-lg font-bold text-gray-900">
                    <h3>Contribution</h3>
                    <div className="ml-4 flex">
                      <FaEthereum className="my-auto max-h-[1.1rem] min-h-[1.1rem]" />
                      <span className="my-auto max-w-[7rem] overflow-y-auto pr-5 font-roboto font-black text-sky-500">
                        {contribution.amount}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 font-roboto text-base font-medium text-gray-500">
                    Campaign id: {contribution.campaignId}
                  </p>
                </div>

                {/* <div className="flex flex-1 items-end justify-between "> */}
                <p className="font-roboto text-sm font-medium text-gray-500">
                  {contribution.campaignOwnerWalletAddress}
                </p>
                {/* </div> */}
              </div>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default ContributionCard;
