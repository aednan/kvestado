import Image from "next/image";
import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className="  relative mt-10 flex max-h-[40rem] w-full justify-evenly pb-10 pt-16 ">
      <main className=" flex items-center justify-center px-4 ">
        <div className=" w-full items-center justify-center  sm:text-center md:w-full md:max-w-fit lg:text-left">
          <h1 className="  text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Designed </span>{" "}
            <span className="block text-indigo-600 xl:inline">To Do Good</span>
          </h1>
          <p className="mt-3 text-center text-base text-gray-800 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            Creative work shows us what’s possible. Help fund it here. Built and
            made on top of the Blockchain technology, No hidden fees.
          </p>
          <div className="mt-5 flex justify-center  ">
            <div className=" mt-5 flex max-w-fit items-center justify-center gap-4 divide-x divide-gray-500 rounded-md bg-gray-800 px-7 py-4 leading-none shadow-md ">
              <span className="cursor-pointer text-white transition-transform hover:scale-105 hover:font-bold">
                Connect Wallet
              </span>
              <span className="cursor-pointer pl-4 text-indigo-300 transition-transform hover:scale-105 hover:font-bold">
                Discover &rarr;
              </span>
            </div>
          </div>
        </div>
      </main>

      <div className=" hidden items-center md:flex">
        <img
          className=" h-[35rem] justify-center drop-shadow-2xl"
          src="/img/cexchange.svg"
          alt=""
        />
      </div>
    </div>
  );
}
