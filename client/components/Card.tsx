import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  items: [
    {
      campaignId: string;
      coverPicturePath: string;
      title: string;
      description: string;
      beneficiaryAddress: string;
      expireAfter: string;
      minimumRaisedValueRequired: string;
      slug: string;
      createdAt: string;
    }
  ];
};

export default function Card(props: Props) {
  return (
    <div className="z-0 pb-2">
      <div className="mx-auto flex max-w-sm flex-col rounded-lg py-4 px-4 sm:max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="self-center border-y-2 py-2 text-center font-roboto text-3xl font-thin tracking-tight text-gray-900 ring-0">
          {props.title}
        </h2>
        {props.items && props.items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.items.map((item: any) => (
              <div
                key={item.campaignId}
                className=" group divide-y overflow-hidden rounded-2xl border-2 border-gray-100 hover:shadow-md"
              >
                <div className=" relative aspect-square w-full  overflow-hidden  rounded-md rounded-b-none bg-gray-200 ">
                  <div className="absolute bottom-2 left-0 max-h-6 max-w-[12rem] items-center overflow-clip bg-white px-1  align-middle shadow-md outline outline-1 outline-gray-300 group-hover:bg-cyan-100 ">
                    <span className="h-full w-full select-none font-roboto text-base font-bold">
                      ID{" "}
                    </span>
                    <span className=" max-w-sm select-all font-roboto text-base font-thin text-gray-900">
                      {item.campaignId}
                    </span>
                  </div>
                  <Link href={`/campaigns/${item.slug}`} passHref>
                    <a>
                      <img
                        // layout="fill"
                        src={
                          item.coverPicturePath
                            ? `${process.env.NEXT_PUBLIC_URLENDPOINT}/tr:w-300,h-300${item.coverPicturePath}`
                            : "/img/campaignD.png"
                        }
                        alt="Campaign"
                        className="h-full w-full cursor-pointer object-fill object-center"
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex h-40 flex-col justify-between px-6 py-4">
                  <div className="flex flex-col  space-y-3 ">
                    <div className="max-h-12 items-center justify-between overflow-clip ">
                      <h2 className="font-semibold ">{item.title}</h2>
                    </div>
                    {/* <div className="max-h-[4.5rem] overflow-y-auto overflow-x-hidden text-base text-gray-600">
                      {product.description}
                    </div> */}
                  </div>
                  <div className="flex flex-col">
                    <span className="max-w-md overflow-clip py-3 text-sm font-semibold tracking-wide text-gray-800">
                      {item.createdAt}
                    </span>
                    <Link href={`/campaigns/${item.slug}`}>
                      <a className="bottom-0 inline-block border-separate cursor-pointer border-t pt-3 pb-1 text-center font-roboto text-sm font-semibold text-blue-500 hover:font-bold hover:text-blue-600 hover:drop-shadow-md">
                        View Campaign &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
