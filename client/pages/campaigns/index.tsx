import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import useResource from "../../services/hooks/useResource";
// import Hero from "../../components/Hero";

type Props = {
  initialData: any;
};

export default function Campaigns(props: Props) {
  const [pagination, setPagination] = useState({
    offset: 0,
    // to be updated to 16
    pageSize: 8,
  });
  const [filter, setFilter] = useState("");

  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/false/get_campaigns",
    params: { ...pagination, filter },
    skip: false,
    withCredentials: false,
    fallbackData: props.initialData,
  });

  // const applyFilter = (e: any) => {
  //   console.log(e.target.value);

  //   setFilter(e.target.value);
  //   // mutate(data, true);

  //   mutateG("contract/api/false/get_campaigns");
  // };
  // const loadMore = () => {
  //   setPagination({
  //     offset: 0,
  //     pageSize: pagination.pageSize + 4,
  //   });
  //   mutate();
  // };
  // const activateLoadMore = () => {
  //   if (pagination.pageSize === 8) {
  //     setPagination({
  //       offset: 0,
  //       pageSize: pagination.pageSize + 4,
  //     });
  //   }
  // };

  useEffect(() => {
    mutate();
  }, [mutate, filter, pagination.pageSize]);

  return (!loading && data !== undefined) || error ? (
    <div className="flex flex-col justify-center  gap-0 pt-7 pb-28">
      <div className=" flex flex-col justify-center space-y-5 py-16 px-5 text-4xl">
        <span className="mx-auto font-roboto font-bold ">DISCOVER</span>
        <span className="mx-auto text-center font-roboto text-2xl font-normal text-sky-500">
          Projects from creators working to build a more beautiful future.
        </span>
      </div>
      <div className="flex justify-center space-x-3">
        {/* select box */}
        <div className="group flex cursor-pointer items-center gap-2 rounded-sm border border-slate-300 px-4 md:w-[28rem]  ">
          <MdSearch className="text-3xl text-gray-400 group-hover:text-gray-800" />
          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="h-12 w-full border-0 bg-transparent text-xl  text-gray-800
            placeholder:font-roboto placeholder:text-lg placeholder:text-gray-400
             focus:border-none focus:outline-none focus:ring-0 "
            placeholder="Search"
          />
        </div>
      </div>
      {data?.content?.length > 0 ? (
        <Card items={data?.content} title="FEATURED PROJECTS" />
      ) : (
        <div className="mx-auto py-24 font-roboto text-4xl font-thin">
          NO RESULTS FOUND
        </div>
      )}
      {!data.last && (
        <div className=" flex justify-center">
          <button
            // onMouseEnter={
            //   pagination.pageSize === 8 ? activateLoadMore : undefined
            // }
            onClick={() => {
              setPagination({
                offset: 0,
                pageSize: pagination.pageSize + 4,
              });
            }}
            className=" cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-transparent py-3 px-7 font-roboto text-base font-bold text-slate-700 hover:border-cyan-600 hover:bg-gray-50 hover:text-cyan-600 md:text-lg"
          >
            Load MORE
          </button>
        </div>
      )}
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
