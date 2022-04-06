import { BsCalendar3 } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

import React from "react";
import Link from "next/link";
import useUser from "../services/hooks/useUser";
import LoadingSpinner from "./LoadingSpinner";

type Props = {};

const Profile = (props: Props) => {
  const { data, mutate, error, loading } = useUser();

  return !loading ? (
    <div className="mx-auto mt-16 w-11/12 rounded-t-xl border-2 p-10 sm:mt-32 ">
      <div className="absolute top-3 right-[36%] h-28 w-28 justify-center overflow-hidden rounded-full border-2  bg-white align-middle  sm:top-12 sm:right-[40%] sm:h-36 sm:w-36 xl:right-[45%] ">
        <img
          //?${Date.now() overcome the issue of caching when updating the image by changing the URL
          src={`${process.env.NEXT_PUBLIC_URLENDPOINT}tr:w-200,h-200${
            data.pictureUrl
          }?${Date.now()}`}
          alt=""
          className=" h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col space-y-8 pt-12 md:pt-2 ">
        <div className="items-center lg:flex lg:items-center lg:justify-between">
          <div className="w-full min-w-0 flex-1 ">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              {data.username}
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BsCalendar3
                  className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Joined {data.joined}
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="block">
              <Link href="/user/settings">
                <a
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <HiPencilAlt
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edit
                </a>
              </Link>
            </span>
          </div>
        </div>

        <span className=" max-h-52 overflow-x-hidden pr-3  font-roboto font-medium">
          {data.about}
        </span>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Profile;
