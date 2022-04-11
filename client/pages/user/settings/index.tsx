import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import InputField from "../../../components/InputField";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AuthContext from "../../../contexts/AuthContext";
import useApiService from "../../../services/hooks/useApiService";
import useUser from "../../../services/hooks/useUser";
import {
  checkEmail,
  classNames,
  uploadImage,
} from "../../../services/ToolsService";
// import { IKImage, IKContext, IKUpload } from "imagekitio-react";

type Props = {};

// TODO: profile settings should be showing only when the user, connected the wallet

const Settings = (props: Props) => {
  const { getRequest, postRequest } = useApiService();
  const { data, mutate, error, isValidating, loading } = useUser({
    skip: false,
  });

  const route = useRouter();

  //TODO: to be updated to path url
  const [photo, setPhoto]: any = useState(null);
  const [username, setUsername]: any = useState("");
  // if validUsername and username matches, then no changes has been done
  const [validUsername, setValidUsername]: any = useState({
    is: false,
    value: "",
  });
  const [validEmail, setValidEmail]: any = useState({
    is: false,
    value: "",
  });
  const [email, setEmail]: any = useState("");
  const [about, setAbout]: any = useState("");

  const { state, setUserInfo } = useContext(AuthContext);

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

  const saveToApi = async () => {
    if (!validUsername.is) {
      // TO DO alert, username required
      console.log("username is required");
      return;
    }
    if (!validEmail.is) {
      // TO DO alert, email required
      console.log("email is required");
      return;
    }
    let pictureUrl = data.pictureUrl;
    try {
      if (photo !== null) {
        pictureUrl = await uploadImage(
          photo,
          false,
          "/profile",
          state.walletAddress
        );
      }

      postRequest("user/profile", {
        username,
        email,
        about,
        pictureUrl: pictureUrl,
      })
        .then((res) => {
          mutate(
            { ...data, username, email, about, pictureUrl: pictureUrl },
            false
          );
          setUserInfo({
            ...data,
            username,
            email,
            about,
            pictureUrl: pictureUrl,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // revalidate data after update
      // mutate({ ...data, username, email, about });
      // console.log(data.email);
    } catch (error) {
      //
      console.log(error);
    }
  };

  // const getImageUrl = async (e: any) => {
  //   return await uploadImage(photo, false, "/profile", state.walletAddress);
  // };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
    setValidUsername({ is: false, value: username });
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setValidEmail({ is: false, value: email });
  };
  const handleUsernameValidation = async (e?: any) => {
    if (username !== validUsername.value || username === "") {
      if (
        username !== "" &&
        (await getRequest("user/check_username", { username }, true))
      ) {
        setValidUsername({ is: true, value: username });
        console.log("username is valid");
      } else {
        setValidUsername({ is: false, value: username });
        console.log("username is invalid");
      }
    }
  };
  const handleEmailValidation = (e?: any) => {
    if (email !== validEmail.value || email === "") {
      if (email !== "" && checkEmail(email)) {
        setValidEmail({ is: true, value: email });
        console.log("email is valid");
      } else if (
        email === "" &&
        data?.email !== undefined &&
        data?.email !== ""
      ) {
        setEmail(data.email);
        setValidEmail({ is: true, value: data.email });
        console.log("email is valid");
      } else {
        setValidEmail({ is: false, value: email });
        console.log("email is invalid");
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      if (data?.username !== undefined) {
        setUsername(data.username);
        setValidUsername({ is: true, value: data.username });
      }
      if (data?.pictureUrl !== undefined) {
        // console.log(data.pictureUrl);
        // setPhoto(data.pictureUrl);
      }
      if (data?.email !== undefined) {
        setEmail(data?.email);
        setValidEmail({ is: true, value: data.email });
      }
      setAbout(data?.about === undefined ? "" : data.about);
    }
  }, [data, loading]);

  return !loading && data !== undefined ? (
    <div className="my-16 flex justify-center">
      <div className=" flex w-11/12 flex-col justify-center space-y-7  sm:w-3/4 md:w-2/4">
        {/* <button onClick={getImageUrl}>Upload it</button> */}
        <span className="mb-10 text-center font-roboto text-4xl font-black">
          Profile Settings
        </span>
        <div className="mx-auto w-full max-w-md ">
          <div className="mb-1 flex items-center justify-between pr-2">
            <label className="mb-1 block pl-2 font-medium  text-gray-700">
              Profile photo
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
          title="Username *"
          value={username === data.username ? "" : username}
          disabled={data.username ? true : false}
          onChangeFunction={handleUsernameChange}
          placeholder={data.username === "" ? "Enter username" : data.username}
        />

        <InputField
          title="Email Address *"
          placeholder={data.email ? data.email : "Enter email"}
          value={email === data.email ? "" : email}
          onChangeFunction={handleEmailChange}
          onFocusFunction={handleUsernameValidation}
        />
        <div className=" mx-auto w-full max-w-md ">
          <label className="mb-1 block pl-2 font-medium text-gray-700">
            About
          </label>
          <textarea
            value={about}
            onFocus={handleEmailValidation}
            onChange={(e: any) => {
              setAbout(e.target.value);
            }}
            className={classNames(
              about === data.about ? " text-gray-400  " : "text-gray-800",
              ` h-32  min-h-[4rem] w-full rounded-lg border  p-4  text-xl drop-shadow-sm  placeholder:font-roboto 
                placeholder:text-base placeholder:text-gray-400 focus:outline-none
                focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
                `
            )}
            placeholder="Brief description for your profile"
          />
        </div>

        <div className=" mx-auto w-full max-w-md">
          <label className="mb-1 block pl-2 font-medium text-gray-700">
            Wallet Address
          </label>
          <input
            disabled
            value={state.walletAddress}
            className="
            h-14
            w-full
rounded-lg border bg-slate-100 p-4  text-center font-roboto
text-base text-gray-400 drop-shadow-sm 
"
            placeholder="Wallet not connected"
          />
        </div>

        <span
          onClick={saveToApi}
          className="mx-auto w-full max-w-[12rem] cursor-pointer select-none rounded-md border py-2 px-7 text-center font-roboto text-lg  font-bold text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md"
        >
          Save changes
        </span>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Settings;
