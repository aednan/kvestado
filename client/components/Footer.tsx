import React from "react";
import {
  AiFillGithub,
  AiFillRedditCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdCopyright } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="min-w-screen absolute bottom-0  z-10 mt-auto h-20 w-full items-center justify-center border-t-2 bg-white py-5 px-4 md:px-8">
      <div className=" flex h-full flex-row divide-x-2">
        <div className=" group flex w-[50%] content-end items-center justify-start  gap-2 bg-white">
          <MdCopyright className="text-xl text-gray-500 group-hover:text-gray-800" />
          <span className=" text-sm text-gray-500 group-hover:text-gray-800 md:text-base">
            2022, All rights reserved.
          </span>
          <span> </span>
        </div>
        <div className="flex w-[50%] items-center justify-end gap-5  bg-white">
          <AiFillGithub className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
          <AiFillTwitterCircle className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
          <AiFillRedditCircle className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
        </div>
      </div>
    </footer>
  );
}
