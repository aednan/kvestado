import { Switch } from "@headlessui/react";
import { BigNumber } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import AuthContext from "../../../contexts/AuthContext";
import useApiService from "../../../services/hooks/useApiService";
import useContractService from "../../../services/hooks/useContractService";
import {
  isEmptyOrContainsSpaceOnly,
  convertFromBigNumberToNumber,
  generateCampaignSlug,
  getEpochExpireTime,
  uploadImage,
} from "../../../services/ToolsService";

type Props = {};

const Create = (props: Props) => {
  const [photo, setPhoto]: any = useState(null);
  const [campaignID, setCampaignID]: any = useState(null);
  const [campaignTitle, setCampaignTitle]: any = useState("");
  const [campaignDescription, setCampaignDescription]: any = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress]: any = useState("");
  const [expireAfter, setExpireAfter]: any = useState("");
  const [amount, setAmount]: any = useState("");

  // const [submitNotAllowed, setSubmitNotAllowed] = useState(true);
  // const handleExpireAfterChange = (e: any) => {
  //   setExpireAfter(e.target.value);
  //   if (!e.target.value.match("^([0-9]+)$")) {
  //     // TODO: alert
  //     console.log("Expire After - is required");
  //     setSubmitNotAllowed(true);
  //     return;
  //   }
  //   checkValuesBeforeSubmit();
  // };
  // const handleAmountChange = (e: any) => {
  //   setAmount(e.target.value);
  //   if (
  //     !e.target.value ||
  //     e.target.value === "" ||
  //     !e.target.value.match("^(([0-9]+))(\\.[0-9]+)?$")
  //   ) {
  //     // TODO: alert
  //     console.log("Amount - is required");
  //     setSubmitNotAllowed(true);
  //     return;
  //   }
  //   checkValuesBeforeSubmit();
  // };
  // const handleCampaignTitleChange = (e: any) => {
  //   setCampaignTitle(e.target.value);
  //   if (isEmptyOrContainsSpaceOnly(e.target.value)) {
  //     // TODO: alert
  //     console.log("Campaign Title - is required");
  //     setSubmitNotAllowed(true);
  //     return;
  //   }
  //   checkValuesBeforeSubmit();
  // };
  // const handleCampaignDescriptionChange = (e: any) => {
  //   setCampaignDescription(e.target.value);
  //   if (isEmptyOrContainsSpaceOnly(e.target.value)) {
  //     // TODO: alert
  //     console.log("Campaign Description - is required");
  //     setSubmitNotAllowed(true);
  //     return;
  //   }
  //   checkValuesBeforeSubmit();
  // };
  // const handleBeneficiaryAddressChange = (e: any) => {
  //   setBeneficiaryAddress(e.target.value);
  //   if (isEmptyOrContainsSpaceOnly(e.target.value)) {
  //     // TODO: alert
  //     console.log("Beneficiary Address - is required");
  //     setSubmitNotAllowed(true);
  //     return;
  //   }
  //   checkValuesBeforeSubmit();
  // };

  const checkValuesBeforeSubmit = () => {
    let check = false;
    if (isEmptyOrContainsSpaceOnly(campaignTitle)) {
      // TODO: alert
      if (campaignTitle !== "") console.log("Campaign title - is required");
      check = true;
    }
    if (isEmptyOrContainsSpaceOnly(campaignDescription)) {
      // TODO: alert
      if (campaignDescription !== "")
        console.log("Campaign description - is required");
      check = true;
    }
    if (isEmptyOrContainsSpaceOnly(beneficiaryAddress)) {
      // TODO: alert
      if (beneficiaryAddress !== "")
        console.log("Beneficiary address - is required");
      check = true;
    }
    // Only Whole numbers are allowed
    if (!expireAfter.match("^([0-9]+)$")) {
      // TODO: alert
      if (expireAfter !== "") console.log("Expire after - is required");
      check = true;
    }
    if (!amount.match("^(([0-9]+))(\\.[0-9]+)?$")) {
      // TODO: alert
      if (amount !== "") console.log("Amount - is required");
      check = true;
    }

    // setSubmitNotAllowed(check);
    return check;
  };

  const { state } = useContext(AuthContext);

  const [mRValue, setMRValue]: any = useState(false);
  const { addCampaign, getReadOnlyContract } = useContractService();
  const { postRequest } = useApiService();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  //
  const createCampaign = async () => {
    if (checkValuesBeforeSubmit()) return;

    let coverImage: any = "";
    const slug = generateCampaignSlug(beneficiaryAddress, campaignTitle);
    const expireTime = getEpochExpireTime(expireAfter);
    if (photo != null) {
      coverImage = await uploadImage(photo, true, "campaigns", slug);
    }
    const campaignUrl = `${process.env.NEXT_PUBLIC_URL}/campaigns/${slug}`;

    // values check should be done before submit

    // adding campaign to the blockchain
    await addCampaign(
      beneficiaryAddress,
      campaignUrl,
      mRValue,
      amount,
      expireTime
    );

    // persist the added campaign to the database
    postRequest("contract/api/add_campaign", {
      id: campaignID,
      coverPicturePath: coverImage,
      title: campaignTitle,
      description: campaignDescription,
      beneficiaryAddress: beneficiaryAddress,
      expireAfter: expireTime,
      amount: amount,
      minimumRaisedValueRequired: mRValue,
      slug: slug,
    }).catch((err) => {
      console.log(err?.response.data.message);
    });

    //
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg, image/gif",
    maxSize: 10000000,
    multiple: false,
    maxFiles: 1,
    onDropRejected: () => {
      // TODO: alert
      console.log("multiple files aren't allowed");
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      if (file.length > 0) {
        setPhoto(file[0]);
      }
    },
    onDropAccepted: () => {
      // TODO: alert photo added
      console.log("photo added");
    },
  });

  useEffect(() => {
    const connectEvent = async () => {
      const readOnlyContract = await getReadOnlyContract();
      const myCampaignEvent = readOnlyContract.on(
        "MyCampaign",
        (campaignOwner: any, campaignId: BigNumber) => {
          // to get the last campaign id from the blockchain
          setCampaignID(convertFromBigNumberToNumber(campaignId) + 1);
        }
      );

      // console.log(myCampaignEvent);
    };
    connectEvent();
    return () => {
      // myCampaignEvent
    };
  }, []);

  return (
    <div className="my-16 flex justify-center">
      <div className=" flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <span className="mb-10 text-center font-roboto text-4xl font-black">
          New Campaign
        </span>
        <div className="mx-auto w-full max-w-md ">
          <div className="mb-1 flex items-center justify-between pr-2">
            <label className="mb-1 block pl-2 font-medium  text-gray-700">
              Campaign Cover
            </label>
            <button
              disabled={photo === null ? true : false}
              onClick={() => {
                setPhoto(null);
              }}
              className="
              cursor-pointer select-none rounded-md border
              py-1 px-2 font-medium text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md  disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none"
            >
              Reset
            </button>
          </div>
          <div
            {...getRootProps()}
            className=" mt-1 flex max-w-md rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:shadow-md"
          >
            <div className="w-full space-y-1 text-center">
              {photo ? (
                <img
                  // layout="fill"
                  src={photo.preview}
                  alt="preview"
                  className="mx-auto h-12 w-12 rounded-full border border-gray-400"
                  height={300}
                  width={300}
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <div className="flex justify-center text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>

              <p className="text-xs text-gray-500">PNG, JPEG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <InputField
          title="Campaign title *"
          placeholder="Enter title"
          value={campaignTitle}
          onChangeFunction={(e: any) => {
            setCampaignTitle(e.target.value);
          }}
        />
        <div className=" mx-auto w-full max-w-md ">
          <div className="mb-1 flex items-center justify-between px-2">
            <label className="font-medium text-gray-700">
              Campaign description (Markdown) *
            </label>

            <button
              disabled={campaignDescription === "" ? true : false}
              className="
cursor-pointer select-none rounded-md border
py-1 px-2 font-medium text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md  disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none
"
            >
              Preview
            </button>
          </div>
          <textarea
            value={campaignDescription}
            onChange={(e: any) => {
              setCampaignDescription(e.target.value);
            }}
            className=" h-32 min-h-[4rem]
w-full rounded-lg border  p-4  text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Description for your campaign"
          />
        </div>

        <InputField
          title="Beneficiary address *"
          placeholder="Enter a valid address"
          value={beneficiaryAddress}
          onChangeFunction={(e: any) => {
            setBeneficiaryAddress(e.target.value);
          }}
        />
        <InputField
          title="Expire after *"
          placeholder="ex: 2 'days'"
          value={expireAfter}
          onChangeFunction={(e: any) => {
            setExpireAfter(e.target.value);
          }}
        />
        <InputField
          title="Amount (ETH) *"
          placeholder="Enter amount"
          value={amount}
          onChangeFunction={(e: any) => {
            setAmount(e.target.value);
          }}
        />
        <div className=" mx-auto w-full max-w-md">
          <Switch.Group
            as="div"
            className="group flex h-16 items-center justify-between rounded-lg border-2  px-3 text-lg font-bold text-gray-600 hover:text-black"
          >
            <Switch.Label className=" block cursor-pointer  font-medium text-gray-700">
              Minimum raised value required
            </Switch.Label>
            <Switch
              checked={mRValue}
              onChange={setMRValue}
              className={classNames(
                mRValue ? "bg-cyan-300" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 "
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  mRValue ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out "
                )}
              ></span>
            </Switch>
          </Switch.Group>
          <div className="mt-7 flex w-full justify-center space-x-2 ">
            <button
              disabled={campaignDescription === "" ? true : false}
              className="
              cursor-pointer select-none rounded-md border
              py-2 px-9 font-roboto text-lg font-bold text-gray-700 shadow-sm hover:bg-slate-50  hover:shadow-md disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none"
            >
              Preview
            </button>
            <SubmitButton
              title="Create"
              validityCheck={checkValuesBeforeSubmit}
              // disabled={submitNotAllowed}
              onClick={createCampaign}
              state={[
                campaignDescription,
                campaignTitle,
                beneficiaryAddress,
                expireAfter,
                amount,
              ]}
              className="select-none rounded-md border py-2 px-9 font-roboto text-lg  font-bold text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md
              disabled:bg-slate-100 disabled:text-gray-400 disabled:hover:shadow-none"
            />
            {/* Create
            </SubmitButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
