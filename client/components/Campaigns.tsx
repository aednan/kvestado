import React from "react";
import Card from "./Card";

type Props = {};

export default function Campaigns({}: Props) {
  return (
    <>
      <div className="flex flex-col gap-0 pt-7 pb-28">
        <Card />
        <div className=" flex justify-center">
          <a
            href="#"
            className=" font-mono items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 text-base font-bold text-slate-700 hover:border-cyan-600 hover:text-cyan-600 md:text-lg"
          >
            VIEW MORE
          </a>
        </div>
      </div>
    </>
  );
}
