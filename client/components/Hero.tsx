import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import useWeb3Service from "../services/hooks/useWeb3Service";

type Props = {};

export default function Hero({}: Props) {
  const { state } = useContext(AuthContext);

  const { connectWallet, userAuthentication } = useWeb3Service();

  return (
    <div className=" relative flex h-full w-full justify-evenly py-16 ">
      <main className=" flex min-w-[50%] items-center justify-center  px-4">
        <div className=" flex w-full flex-col items-center justify-center  sm:text-center md:w-full md:max-w-fit lg:text-left">
          <h1 className="  text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block font-roboto font-normal xl:inline">
              Designed{" "}
            </span>
            <span className="block font-roboto font-thin text-sky-500 xl:inline">
              To Do Good
            </span>
          </h1>
          <p className="mt-3 text-center font-roboto text-base font-normal text-gray-800 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            Creative work shows us what’s possible. Help fund it here. Built and
            made on top of the Blockchain technology, No hidden fees.
          </p>
          <div className="mt-5 flex w-full justify-center ">
            <div className="flex max-w-fit items-center justify-center gap-4 divide-x divide-gray-500 rounded-md bg-gray-800 px-7 py-4 leading-none shadow-md ">
              {state.isAuthenticated ? (
                <Link href="/campaigns/create" passHref>
                  <span className="cursor-pointer font-roboto font-bold text-white transition-transform hover:scale-105">
                    Create Campaign
                  </span>
                </Link>
              ) : (
                <span
                  onClick={async () => {
                    if (!state.isSubmitBtnDisabled) {
                      await connectWallet();
                    }
                  }}
                  className="cursor-pointer font-roboto font-bold text-white transition-transform hover:scale-105"
                >
                  Connect Wallet
                </span>
              )}
              <Link href="/campaigns" passHref>
                <span className="cursor-pointer pl-4 font-roboto font-bold text-sky-500 transition-transform hover:scale-105">
                  Discover &rarr;
                </span>
              </Link>
              {/* 
              // test userAuthentication
              <span
                onClick={async () =>
                  await userAuthentication(
                    "8126e09f-a374-41b9-a359-23451dd01002",
                    state.provider
                  )
                }
                className="cursor-pointer bg-white"
              >
                sdjkfkjsdkjfkj
              </span> */}
            </div>
          </div>
        </div>
      </main>

      <div className=" hidden min-w-[50%] items-center justify-center md:flex">
        <img
          // layout="fill"
          className=" h-[30rem] justify-center drop-shadow-2xl"
          src="/img/cexchange.svg"
          alt=""
        />
      </div>
    </div>
  );
}
