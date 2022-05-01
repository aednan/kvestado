import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdMail } from "react-icons/md";
import useApiService from "../services/hooks/useApiService";
import { checkEmail, classNames } from "../services/ToolsService";

type Props = {};

const Newsletter = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);

  const { postRequest } = useApiService();

  const handleSubmit = (e: any) => {
    postRequest(
      "subscribe_newsletter",
      {
        email: email,
      },
      false
    )
      .then((res: any) => {
        setEmail("");
        // alert Transaction started
        // console.log(res);
      })
      .catch((err) => {
        // please check your transaction on etherscan and add it again
        console.log(err.data);
      });

    e.preventDefault();
  };

  useEffect(() => {
    // email validation
    if (checkEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  return (
    <div className="flex h-full xl:divide-x-2 xl:py-1">
      <form
        onSubmit={handleSubmit}
        className=" flex w-full flex-col items-center justify-evenly  "
      >
        <h1 className="leading-tighter text-center font-roboto text-4xl font-bold sm:max-w-[17ch] ">
          Subscribe to our Newsletter
        </h1>
        <div className="w-full max-w-md ">
          <div className="flex flex-col space-y-5  sm:flex-row sm:space-y-0">
            <div className="relative flex w-full items-center rounded-md  shadow-md">
              <MdMail
                className={classNames(
                  isValidEmail ? "  text-sky-600" : "text-gray-400",
                  "absolute left-3 h-6 w-6 "
                )}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={classNames(
                  isValidEmail ? "  border-sky-600" : "border-slate-300",
                  "block w-full max-w-4xl rounded-md rounded-r-none border-2 border-r-0  bg-transparent py-4 pl-10 font-bold text-black placeholder-gray-400 outline-none ring-0 "
                )}
                required
              />
              <button
                disabled={isValidEmail ? false : true}
                className="
              font-mono cursor-pointer items-center justify-center self-center rounded-md rounded-l-none border-2 border-l-0  border-sky-600 bg-sky-600 p-4  text-base font-bold text-slate-200
               hover:bg-sky-700 
              disabled:cursor-not-allowed disabled:border-gray-500
              disabled:bg-slate-400 disabled:text-slate-500 disabled:opacity-30 "
                type="submit"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/user/settings">
            <a className="group flex items-center font-roboto text-xs font-bold text-sky-800 opacity-80 transition-all duration-200 ease-in-out hover:opacity-100">
              JOIN NOW &rarr;
            </a>
          </Link>
        </div>
      </form>
      <div className="relative hidden w-full max-w-[50%] justify-center md:flex">
        <div className="max-w-400 max-h-400">
          <img
            // layout="fill"
            src="/img/newsletter.svg"
            alt=""
            // layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
