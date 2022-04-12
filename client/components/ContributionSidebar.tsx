/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import InputField from "./InputField";
import { FaEthereum } from "react-icons/fa";
import CampaignInfoCard from "./CampaignInfoCard";
import useApiService from "../services/hooks/useApiService";
import useContractService from "../services/hooks/useContractService";
import ContributionCard from "./ContributionCard";

type Props = {
  campaignId: number;
  campaignOwnerWalletAddress: string;
  open: boolean;
  setOpen: any;
};

export default function ContributionSidebar(props: Props) {
  const [contributionAmount, setContributionAmount] = useState("");
  const [submitNotAllowed, setSubmitNotAllowed] = useState(true);

  const { postRequest } = useApiService();
  const { contribute } = useContractService();

  const handleContributionAmountChange = (e: any) => {
    setContributionAmount(e.target.value);
    //
    if (
      // !e.target.value ||
      !e.target.value.match("^(([0-9]+))(\\.[0-9]+)?$")
    ) {
      // TODO: Alert
      console.log("Amount is required");
      setSubmitNotAllowed(true);
      return;
    }
    setSubmitNotAllowed(false);
  };

  const saveContributionToAPI = async () => {
    if (contributionAmount.match("^(([0-9]+))(\\.[0-9]+)?$")) {
      // adding campaign to the blockchain
      await contribute(
        props.campaignOwnerWalletAddress,
        props.campaignId,
        Number(contributionAmount)
      )
        .then((res) => {
          postRequest("contract/api/add_contribution", {
            campaignOwnerWalletAddress: props.campaignOwnerWalletAddress,
            campaignId: props.campaignId,
            amount: contributionAmount,
          })
            .then((res) => {
              setContributionAmount("");
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(console.log("Amount is required"));
    }
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={props.setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md ">
                <div className="flex h-full flex-col overflow-y-scroll rounded-l-xl bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="font-roboto text-lg font-bold text-gray-900">
                        Contribution
                      </Dialog.Title>
                      <div className=" ml-3 flex h-7 items-center">
                        <span
                          className="-m-2 cursor-pointer p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => props.setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-8 w-8" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className=" flow-root space-y-12">
                        <InputField
                          title="Contribution Amount (ETH) *"
                          placeholder="Enter Amount"
                          value={contributionAmount}
                          onChangeFunction={handleContributionAmountChange}
                        />

                        <CampaignInfoCard
                          campaignId={props.campaignId}
                          campaignOwnerWalletAddress={
                            props.campaignOwnerWalletAddress
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between  text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <div className="flex h-full  ">
                        <FaEthereum className="my-auto min-h-[1.3rem] min-w-[1.3rem] " />
                        <p className=" m-auto h-full max-w-[12rem] overflow-x-auto font-roboto font-semibold   ">
                          {" "}
                          {contributionAmount && !submitNotAllowed
                            ? contributionAmount
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-0.5 font-roboto text-sm text-gray-500">
                      Thank you for your contribution.
                    </p>
                    <div className="mt-6">
                      <button
                        disabled={submitNotAllowed}
                        onClick={saveContributionToAPI}
                        className="
                        flex w-full
                        items-center justify-center rounded-md border border-transparent bg-sky-700 px-6 py-3 font-roboto text-base font-medium text-white shadow-sm hover:bg-sky-800 disabled:opacity-30 disabled:hover:bg-sky-700"
                      >
                        CONTRIBUTE
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center font-roboto text-sm text-gray-500">
                      <p>
                        or{" "}
                        <span
                          className="
                          cursor-pointer font-roboto 
                          font-medium text-sky-600 hover:text-sky-700"
                          onClick={() => props.setOpen(false)}
                        >
                          Back to campaign
                          <span aria-hidden="true"> &rarr;</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
