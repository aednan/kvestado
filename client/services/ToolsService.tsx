import axios from "axios";

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
// function te() {
//   axios
//     .post("https://upload.imagekit.io/api/v1/files/upload", null, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       params: {
//         file: null,
//         publicKey: process.env.NEXT_PUBLIC_PUBLICKEY,
//         signature: null,
//         folder: "/kv",
//       },
//     })
//     .then((res) => {
//       console.log("TEST:", res.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
