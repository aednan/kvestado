import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserSettingsContext from "../../contexts/UserSettingsContext";
import useResource from "../../services/hooks/useResource";
// import Hero from "../../components/Hero";

type Props = {};

export default function campaigns({}: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const { bottomScrollDetected } = useContext(UserSettingsContext);

  const [pagination, setPagination] = useState({
    offset: 0,
    pageSize: 10,
  });

  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/get_campaigns",
    params: pagination,
    skip: false,
  });

  useEffect(() => {
    if (data != undefined) {
      if (bottomScrollDetected && !data.last && !data.first) {
        setPagination({
          offset: pagination.offset + 10,
          pageSize: 10,
        });
        // console.log("last");
        // TODO: show loading animation
        // load more campaigns
      }
    }
  }, [data, bottomScrollDetected]);

  return !loading && data !== undefined ? (
    <div className="flex flex-col gap-0 pt-7 pb-28">
      <Card products={data?.content} title="Campaigns" />
      {/* <div className=" flex justify-center">
        <Link href="/campaigns">
          <a className=" font-mono items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 text-base font-bold text-slate-700 hover:border-cyan-600 hover:text-cyan-600 md:text-lg">
            VIEW MORE
          </a>
        </Link>
      </div> */}
    </div>
  ) : (
    <LoadingSpinner />
  );
}
