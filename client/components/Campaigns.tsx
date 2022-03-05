import React from "react";
import Card from "./Card";

type Props = {};

export default function Campaigns({}: Props) {
  return (
    <>
      <div className="flex flex-col  gap-0 pt-7 pb-28">
        <Card />
        <div className=" flex justify-center">
          <a
            href="#"
            className=" items-center justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-base font-medium text-white hover:bg-indigo-700 md:text-lg"
          >
            Browse more
          </a>
        </div>
      </div>
    </>
  );
}
