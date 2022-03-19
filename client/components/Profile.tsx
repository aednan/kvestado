import { Fragment } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

import React from "react";
import Link from "next/link";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="mx-auto mt-16 w-11/12 rounded-t-xl border-2 p-10 sm:mt-32 ">
      <div className="absolute top-3 right-[36%] h-28 w-28 justify-center overflow-hidden rounded-full border-2  bg-white align-middle  sm:top-12 sm:right-[40%] sm:h-36 sm:w-36 xl:right-[45%] ">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt=""
          className=" h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col space-y-8 pt-12 md:pt-2 ">
        <div className="items-center lg:flex lg:items-center lg:justify-between">
          <div className="w-full min-w-0 flex-1 ">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Username placeholder
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BsCalendar3
                  className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Joined {"January 2019"}
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="block">
              <Link href="/settings">
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

        <span className=" font-roboto font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </span>
      </div>
    </div>
  );
};

export default Profile;
