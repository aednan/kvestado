import { useState } from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../services/ToolsService";
import useResource from "../services/hooks/useResource";
import Card from "./Card";
import ContributionCard from "./ContributionCard";

export default function Tabs() {
  const { data: campaignData, loading: campaignLoading } = useResource({
    resourcePath: "contract/api/get_my_campaigns",
    params: { offset: 0, pageSize: 4 },
    skip: false,
    withCredentials: true,
  });

  const { data: contributionData, loading: contributionLoading } = useResource({
    resourcePath: "contract/api/get_my_contributions",
    params: { offset: 0, pageSize: 4 },
    skip: false,
    withCredentials: true,
  });

  let [categories] = useState({
    Campaigns: { id: "campaign" },
    Contributions: { id: "contribution" },
  });

  return (
    <div className="mx-auto w-11/12 ">
      <Tab.Group>
        <Tab.List className=" flex space-x-0.5  rounded-xl rounded-t-none border-2 border-t-0 bg-gray-200">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full  rounded-b-xl  border-t-2 bg-white py-2.5 font-roboto text-lg font-medium leading-5 text-gray-500",
                  "ring-0 focus:outline-none ",
                  selected
                    ? "border-blue-400 bg-white text-blue-400"
                    : "  hover:text-blue-400"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((category) => (
            <Tab.Panel
              key={category.id}
              className={classNames(
                "rounded-xl bg-white p-3",
                "h-[34rem] overflow-y-auto overflow-x-hidden border-2 border-slate-200 ring-0 ring-white ring-opacity-60 ring-offset-2 focus:outline-none"
              )}
            >
              {category.id === "campaign" && !campaignLoading && (
                <Card products={campaignData?.content} title="" />
              )}
              {category.id === "contribution" && !campaignLoading && (
                <ContributionCard contributions={contributionData?.content} />
              )}

              {/* {category.id === "contribution" && !contributionLoading && (
                <Card products={contributionData?.content} title="" />
              )} */}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
