import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserSettingsContext from "../../contexts/UserSettingsContext";
import useResource from "../../services/hooks/useResource";
// import Hero from "../../components/Hero";

type Props = {
  initialData: any;
};

export default function Campaigns(props: Props) {
  // const { bottomScrollDetected } = useContext(UserSettingsContext);

  const [pagination, setPagination] = useState({
    offset: 0,
    // to be updated to 16
    pageSize: 4,
  });

  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/false/get_campaigns",
    params: pagination,
    skip: false,
    withCredentials: false,
    fallbackData: props.initialData,
  });

  const loadMore = () => {
    console.log(data);
    setPagination({
      offset: 0,
      pageSize: pagination.pageSize + 4,
    });

    // console.log(pagination.pageSize);
    mutate(data);
  };

  useEffect(() => {
    // if (data != undefined) {
    //   if (bottomScrollDetected && !data.last && !data.first) {
    //     setPagination({
    //       offset: 0,
    //       pageSize: pagination.pageSize + 8,
    //     });
    //     console.log("last");
    //     // TODO: show loading animation
    //     // load more campaigns
    //     // mutate();
    //   }
    // }
  }, []);

  return (!loading && data !== undefined) || error ? (
    <div className="flex flex-col gap-0 pt-7 pb-28">
      <Card items={data?.content} title="Campaigns" />
      <div className=" flex justify-center">
        <button
          onClick={loadMore}
          className=" cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 font-roboto text-base font-bold text-slate-700 hover:border-cyan-600 hover:bg-gray-50 hover:text-cyan-600 md:text-lg"
        >
          Load MORE
        </button>
      </div>

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

export async function getStaticProps(context: any) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/`,
    timeout: 1500,
  });
  let response: any = [];
  try {
    response = await instance.get("contract/api/false/get_campaigns", {
      params: { offset: "0", pageSize: "16" },
    });
    response = response.data;
  } catch (error: any) {
    // console.log(error);
  }

  return {
    props: { initialData: response }, // will be passed to the page component as props
  };
}
