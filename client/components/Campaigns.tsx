import Link from "next/link";
import React from "react";
import useResource from "../services/hooks/useResource";
import Card from "./Card";

type Props = {};

export default function Campaigns({}: Props) {
  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/true/get_campaigns",
    params: { offset: 0, pageSize: 4 },
    skip: false,
    withCredentials: false,
  });

  return !loading && data !== undefined && data?.content.length > 0 ? (
    <div className="flex flex-col gap-0 pt-7 pb-28">
      <Card items={data?.content} title="EXISTING CAMPAIGNS" />
      <div className=" flex justify-center">
        <Link href="/campaigns">
          <a className=" items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 font-roboto text-base font-bold text-slate-700 hover:border-cyan-600 hover:bg-gray-50 hover:text-cyan-600 md:text-lg">
            VIEW MORE
          </a>
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
}
