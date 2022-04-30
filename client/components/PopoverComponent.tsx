import { Popover, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import { Fragment } from "react";

const solutions = [
  {
    name: "Create Campaign",
    description: "Create a new campaign",
    href: "/campaigns/create",
    icon: IconOne,
  },
  {
    name: "Find Campaign",
    description: "Find existing campaign",
    href: "/campaigns",
    icon: IconTwo,
  },
];

export default function PopoverComponent() {
  return (
    <div className="relative max-w-sm ">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-opacity-100" : "text-opacity-75"}
                group inline-flex items-center rounded-md py-2 text-lg font-bold text-gray-700 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Explore</span>
              <IoChevronDownOutline
                className={`${open ? "text-opacity-100" : "text-opacity-75"}
                  ml-1 h-5 w-5 text-gray-700 transition duration-150 ease-in-out group-hover:text-opacity-100`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-48 z-10 mt-5 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 ">
                    {solutions.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <item.icon aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="font-roboto text-sm font-semibold text-gray-900">
                              {item.name}
                            </p>
                            <p className="font-roboto text-sm font-normal text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Link href="/docs">
                      <a
                      // href="##"
                      >
                        <span className="flex items-center">
                          <span className="font-roboto text-sm font-semibold text-gray-900">
                            Documentation
                          </span>
                        </span>
                        <span className="block font-roboto text-sm font-normal text-gray-500">
                          Get started with KVESTADO
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#7DD3FC" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#0369A1"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#0284C7"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#0EA5E9"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#7DD3FC" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#0369A1"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#0EA5E9"
        strokeWidth="2"
      />
    </svg>
  );
}
