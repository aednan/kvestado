import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../services/ToolsService";
import useResource from "../services/hooks/useResource";
import Card from "./Card";
import ContributionCard from "./ContributionCard";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("");

  const [cPagination, setCPagination] = useState({
    offset: 0,
    pageSize: 8,
  });
  const [caPagination, setCaPagination] = useState({
    offset: 0,
    pageSize: 8,
  });
  const {
    mutate: cMutate,
    data: campaignData,
    loading: campaignLoading,
  } = useResource({
    resourcePath: "contract/api/get_my_campaigns",
    params: cPagination,
    skip: false,
    withCredentials: true,
  });

  const {
    mutate: contributionMutate,
    data: contributionData,
    loading: contributionLoading,
  } = useResource({
    resourcePath: "contract/api/get_my_contributions",
    params: caPagination,
    skip: false,
    withCredentials: true,
  });

  let [categories] = useState({
    Campaigns: { id: "campaign" },
    Contributions: { id: "contribution" },
  });

  const handleScroll = () => {
    if (selectedTab == "Campaigns" && !campaignData?.last) {
      setCPagination({
        offset: 0,
        pageSize: cPagination.pageSize + 4,
      });
    }
    if (selectedTab == "Contributions" && !contributionData?.last) {
      setCaPagination({
        offset: 0,
        pageSize: caPagination.pageSize + 4,
      });
    }
  };

  useEffect(() => {
    if (selectedTab == "Campaigns" && !campaignData?.last) {
      cMutate();
    }
    if (selectedTab == "Contributions" && !contributionData?.last) {
      contributionMutate();
    }
  }, [
    cMutate,
    contributionMutate,
    cPagination.pageSize,
    caPagination.pageSize,
    campaignData?.last,
    contributionData?.last,
    selectedTab,
  ]);

  return (
    <div className="mx-auto w-11/12 ">
      <Tab.Group>
        <Tab.List className=" flex space-x-0.5  rounded-xl rounded-t-none border-2 border-t-0 bg-gray-200">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) => {
                if (selected) {
                  setSelectedTab(category);
                }
                return classNames(
                  "w-full rounded-b-xl border-t-2  bg-white py-2.5 font-roboto text-lg font-medium leading-5 text-gray-500 hover:bg-slate-50",
                  "ring-0 focus:outline-none ",
                  selected
                    ? "border-blue-400 bg-white text-sky-700"
                    : "  hover:text-sky-700"
                );
              }}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((category) => (
            <Tab.Panel
              // ref={tabRef}
              onScroll={handleScroll}
              key={category.id}
              className={classNames(
                "rounded-xl bg-white p-3",
                "h-[35rem] overflow-y-auto overflow-x-hidden border-slate-200 ring-0 ring-white ring-opacity-60 ring-offset-2 focus:outline-none"
              )}
            >
              {category.id === "campaign" && !campaignLoading && (
                <>
                  <Card items={campaignData?.content} title="" />
                </>
              )}
              {category.id === "contribution" && !campaignLoading && (
                <ContributionCard contributions={contributionData?.content} />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* {!campaignData?.last && (
        <div className=" flex justify-center pt-16">
          <button
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
      )} */}
    </div>
  );
}
