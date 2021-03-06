import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  AiFillGithub,
  AiFillRedditCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdCopyright } from "react-icons/md";
import AuthContext from "../contexts/AuthContext";
import Newsletter from "./Newsletter";

export default function Footer() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  return (
    <footer className="bottom-0 z-10 mt-auto h-20 w-full items-center justify-center divide-y-2 bg-slate-50  ">
      {/* to show only at home page or everything after /# */}
      {router.asPath.match("^(/#)|^(/)$") && !state.isAuthenticated && (
        <div className=" h-80 border-t-2 bg-slate-50 px-4 md:px-8">
          <Newsletter />
        </div>
      )}
      <div className=" flex h-full flex-row  bg-slate-100 px-4 py-7 md:px-8 ">
        <div className=" group flex w-[50%] content-end items-center justify-start  gap-2 bg-transparent">
          <MdCopyright className="text-xl text-gray-500 group-hover:text-gray-800" />
          <span className=" text-sm text-gray-500 group-hover:text-gray-800 md:text-base">
            2022, All rights reserved.
          </span>
          <span> </span>
        </div>
        <div className="flex w-[50%] items-center justify-end gap-5  bg-transparent">
          <a
            href="https://github.com/aednan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AiFillGithub className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
          </a>

          <a
            href="https://twitter.com/aednaan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AiFillTwitterCircle className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
          </a>
          <AiFillRedditCircle className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black " />
        </div>
      </div>
    </footer>
  );
}
