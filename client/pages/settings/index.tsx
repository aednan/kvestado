import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ContributionSidebar from "../../components/ContributionSidebar";

type Props = {};

// TODO: profile settings should be showing only when the user, connected the wallet

const settings = (props: Props) => {
  //TODO: to be updated to path url
  const [photo, setPhoto]: any = useState(null);

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
      <ContributionSidebar />
      <div className=" mt-12 flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <span className="mb-10 text-center font-roboto text-4xl font-black">
          Profile Settings
        </span>
        <div className="mx-auto w-full max-w-md ">
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Profile photo
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
            Username
          </label>
          <input
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter username"
          />
        </div>
        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium text-gray-700">
            Email Address
          </label>
          <input
            className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter email"
          />
        </div>
        <div className=" mx-auto w-full max-w-md ">
          <label className="mb-1 block pl-2 font-medium text-gray-700">
            About
          </label>
          <textarea
            className=" h-32 min-h-[4rem]
w-full rounded-lg border  p-4  text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Brief description for your profile"
          />
        </div>

        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium text-gray-700">
            Wallet Address
          </label>
          <input
            disabled
            value="0x8fb538ecf5e4e813a15a3986ed954ff75c163857"
            className="
            h-14
w-full rounded-lg border p-4  text-center font-roboto
text-base text-gray-800  drop-shadow-sm 
"
            placeholder="Enter email"
          />
        </div>
        {/* <div>
          <span onClick={() => console.log(photo)}>jrjsfsioefoiesoi</span>
          <img src={photo.preview} alt="preview" height={300} width={300} />
        </div> */}

        {/* <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 focus:drop-shadow-md">
                http://
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className=" h-14
                max-w-md rounded-lg rounded-l-none border  p-4 text-xl
                text-gray-800 drop-shadow-sm  placeholder:font-roboto 
                placeholder:text-base placeholder:text-gray-400 focus:outline-none
                focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
                "
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default settings;
