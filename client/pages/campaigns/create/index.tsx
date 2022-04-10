import { Switch } from "@headlessui/react";
import { BigNumber } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AuthContext from "../../../contexts/AuthContext";
import useApiService from "../../../services/hooks/useApiService";
import useContractService from "../../../services/hooks/useContractService";
import {
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

  const { state } = useContext(AuthContext);

  const [mRValue, setMRValue]: any = useState(false);
  const { addCampaign, getReadOnlyContract } = useContractService();
  const { postRequest } = useApiService();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  //
  const createCampaign = async () => {
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
  }, [getReadOnlyContract]);

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

        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Campaign title *
          </label>
          <input
            value={campaignTitle}
            onChange={(e) => {
              setCampaignTitle(e.target.value);
            }}
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter title"
          />
        </div>
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
            onChange={(e) => {
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
        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Beneficiary address *
          </label>
          <input
            value={beneficiaryAddress}
            onChange={(e) => {
              setBeneficiaryAddress(e.target.value);
            }}
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter a valid address"
          />
        </div>
        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Expire after *
          </label>
          <input
            value={expireAfter}
            onChange={(e) => {
              setExpireAfter(e.target.value);
            }}
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="ex: 2 days"
          />
        </div>
        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Amount (in Ether) *
          </label>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter amount"
          />
        </div>
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
            <span
              onClick={createCampaign}
              className="cursor-pointer select-none rounded-md border py-2 px-9 font-roboto text-lg  font-bold text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md"
            >
              Create
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
