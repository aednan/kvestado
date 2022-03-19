import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {};

const Create = (props: Props) => {
  const [photo, setPhoto]: any = useState(null);
  const [enabled, setEnabled]: any = useState(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

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

  return (
    <div className="my-16 flex justify-center">
      <div className=" flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <span className="mb-10 text-center font-roboto text-4xl font-black">
          New Campaign
        </span>
        <div className="mx-auto w-full max-w-md ">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Campaign Cover
          </label>
          <div
            {...getRootProps()}
            className=" mt-1 flex max-w-md rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:shadow-md"
          >
            <div className="w-full space-y-1 text-center">
              {photo ? (
                <img
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
            Campaign title
          </label>
          <input
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
              Campaign description (Markdown)
            </label>
            <label className="cursor-pointer select-none rounded-md border py-1 px-2 font-medium  text-gray-700 shadow-sm hover:shadow-md">
              Preview
            </label>
          </div>
          <textarea
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
            Beneficiary address
          </label>
          <input
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
            Expire after
          </label>
          <input
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
            Amount (in Ether)
          </label>
          <input
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
              Minimum raised value
            </Switch.Label>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={classNames(
                enabled ? "bg-cyan-300" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 "
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  enabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out "
                )}
              ></span>
            </Switch>
          </Switch.Group>
        </div>
      </div>
    </div>
  );
};

export default Create;
