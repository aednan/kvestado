import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {};

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
    <div className="my-16 flex justify-center ">
      <div className=" mt-12 flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        <h1 className="mb-10 font-roboto text-4xl font-black">
          Profile Settings
        </h1>
        <div>
          <label className="mb-1 block pl-2 font-medium  text-gray-700">
            Profile photo
          </label>
          <div
            {...getRootProps()}
            className="mt-1 flex max-w-md justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:shadow-md"
          >
            <div className="space-y-1 text-center">
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
              <div className="flex text-sm text-gray-600">
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

        <div className="flex flex-col">
          <label className="mb-1 pl-2 font-medium  text-gray-700">
            Username
          </label>
          <input
            className="
h-14 max-w-md rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter username"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 pl-2 font-medium text-gray-700">
            Email Address
          </label>
          <input
            className="
h-14 max-w-md rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 pl-2 font-medium text-gray-700">About</label>
          <textarea
            className="
h-32 max-w-md rounded-lg border  p-4  text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
            placeholder="Brief description for your profile"
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
