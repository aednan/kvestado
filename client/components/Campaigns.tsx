import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApiService from "../services/hooks/useApiService";
import useResource from "../services/hooks/useResource";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

type Props = {};

export default function Campaigns({}: Props) {
  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/get_campaigns",
    params: { offset: 0, pageSize: 4 },
    skip: false,
    withCredentials: false,
  });

  return !loading && data !== undefined && data?.content.length > 0 ? (
    <div className="flex flex-col gap-0 pt-7 pb-28">
      <Card products={data?.content} title="Existing Campaigns" />
      <div className=" flex justify-center">
        <Link href="/campaigns">
          <a className=" font-mono items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 text-base font-bold text-slate-700 hover:border-cyan-600 hover:text-cyan-600 md:text-lg">
            VIEW MORE
          </a>
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
}
