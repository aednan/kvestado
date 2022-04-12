import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { RefObject } from "react";

export function getAllArticles(r: any) {
  return r.keys().map((fileName: any) =>
    JSON.stringify({
      slug: fileName.substr(1).replace(/\.mdx$/, ""),
      meta: r(fileName).meta,
    })
  );
}

export const checkEmail = (email: string) => {
  // /^regex/
  var emailPattern =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return email.match(emailPattern);
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// imagekit post test, not finished
// useUniqueFileName:false => to replace user profile picture once updated
// https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload
export async function uploadImage(
  file: any,
  useUniqueFileName: boolean,
  folderPath: string,
  fileName: string
) {
  const formaData = new FormData();

  formaData.append("file", file);
  formaData.append("fileName", `${fileName}`);
  formaData.append("folder", `/kv/${folderPath}`);

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/ik-auth`,
      {
        params: { expire: "300" },
        withCredentials: true,
      }
    );
    formaData.append("publicKey", `${process.env.NEXT_PUBLIC_PUBLICKEY}`);
    formaData.append("signature", res.data.signature);
    formaData.append("token", res.data.token);
    formaData.append("expire", res.data.expire);
    formaData.append("useUniqueFileName", `${useUniqueFileName}`);
    //
    const imagekitAPIResponse = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      formaData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Cache-Control": "no-cache",
        },
        withCredentials: false,
      }
    );

    // purgeCacheAfterUpload(imagekitAPIResponse.data.url);
    return imagekitAPIResponse.data.filePath;
    //
  } catch (error) {
    console.log(error);
  }

  //
}

export const convertFromBigNumberToNumber = (bigNumberValue: BigNumber) => {
  // if (typeof bigNumberValue !== "bigint") return "";
  return Number(ethers.utils.formatUnits(bigNumberValue)) * Math.pow(10, 18);
};

// const base64File = await convertToBase64(file);
const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export const generateCampaignSlug = (
  beneficiaryWalletAddress: string,
  campaignTitle: string
) => {
  const slug = ethers.utils.hashMessage(
    `${beneficiaryWalletAddress}:${campaignTitle}:${1 + Math.random() * 99}`
  );
  return slug;
};

export const getEpochExpireTime = (expireAfter: number) => {
  return expireAfter * 86400000 + new Date().getTime();
};

// export const getRandomAvatar = (seed: string) => {
//   return createAvatar(style, {
//     seed: seed,
//     // ... and other options
//   });
// };

export class ValidationError extends Error {
  constructor() {
    super("Skip Request");
    this.name = "VError";
  }
}

export const isEmptyOrContainsSpaceOnly = (value: string) => {
  return value.replace(/\s/g, "").length === 0;
};

export const resetScroll = (divRef: RefObject<HTMLDivElement> | undefined) => {
  divRef?.current?.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// export const withTimeoutWrapper = async (
//   toRun: Function,
//   delay: any,
//   callbackAfterDelayExceeded: any
// ) => {
// // console.log("XX");

// try {
//   const accounts = await toRun();
//   console.log(accounts);
//   const id = setTimeout(callbackAfterDelayExceeded, delay);
//   await new Promise((resolve) => {
//     const tid = setTimeout(resolve, delay);
//     if (accounts) {
//       clearTimeout(tid);
//     }
//   });
//   console.log("X");
//   clearTimeout(id);
//   return accounts;
// } catch (error) {
//   throw error;
// }
// toRun()
//   .then((res: any) => {
//     console.log("X1");
//     console.log(res);
//     return res;
//   })
//   .catch((err: any) => {
//     console.log("X2");
//     throw err;
//   });
// const id = setTimeout(callbackAfterDelayExceeded, delay);
// await new Promise((resolve) => {
//   setTimeout(resolve, delay);
// });
// clearTimeout(id);
// };
