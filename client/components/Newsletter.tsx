import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdMail } from "react-icons/md";
import { checkEmail, classNames } from "../services/ToolsService";

type Props = {};

const Newsletter = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);

  const handleSubmit = (e: any) => {
    setEmail("");
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
    <div className="flex h-full justify-evenly ">
      <form
        onSubmit={handleSubmit}
        className=" flex w-full max-w-4xl flex-col items-center justify-evenly  "
      >
        <h1 className="leading-tighter text-center font-roboto text-4xl font-bold sm:max-w-[17ch] ">
          Subscribe to our Newsletter
        </h1>
        <div className="w-full max-w-md ">
          <div className="flex flex-col space-y-5  sm:flex-row sm:space-y-0">
            <div className="relative flex w-full items-center rounded-md  shadow-md">
              <MdMail className="absolute left-3 h-6 w-6 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={classNames(
                  isValidEmail ? "  border-cyan-400" : "border-slate-300",
                  "block w-full max-w-3xl rounded-md rounded-r-none border-2 border-r-0  bg-transparent py-4 pl-10 font-bold text-black placeholder-gray-400 outline-none ring-0 "
                )}
                required
              />
              <button
                disabled={isValidEmail ? false : true}
                className="
              font-mono cursor-pointer items-center justify-center self-center rounded-md rounded-l-none border-2 border-l-0  border-cyan-400 bg-cyan-400  p-4 text-base font-bold
               text-gray-500 
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
            <a className="group flex items-center font-roboto text-xs font-medium opacity-80 transition-all duration-200 ease-in-out hover:opacity-100">
              JOIN NOW &rarr;
            </a>
          </Link>
        </div>
      </form>
      <div className="relative max-w-400 max-h-400 hidden justify-center md:flex  ">
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
  );
};

export default Newsletter;
