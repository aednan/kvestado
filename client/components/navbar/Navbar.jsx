import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillRedditCircle,
} from "react-icons/ai";
import {
  MdOutlineAccountBalanceWallet,
  MdAccountCircle,
  MdMenu,
  MdClose,
  MdAddCircleOutline,
  MdLibraryBooks,
  MdAppRegistration,
  MdModeNight,
} from "react-icons/md";
import "../../styles/Navbar.module.css";

import PopoverComponent from "../popover/PopoverComponent";

const navigation = [
  //   { name: "Dashboard", href: "#", current: true },
  {
    name: "Create",
    href: "#",
    current: false,
    icon: (
      <MdAddCircleOutline className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: false,
  },
  {
    name: "Campaign",
    href: "#",
    current: false,
    icon: (
      <MdAppRegistration className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: false,
  },
  // docs how the contract works
  {
    name: "Resources",
    href: "#",
    current: false,
    icon: (
      <MdLibraryBooks className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: false,
  },
  {
    name: "Night mode",
    href: "#",
    current: false,
    icon: (
      <MdModeNight className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="fixed w-full overflow-hidden bg-transparent"
    >
      {({ open }) => (
        <>
          <div className=" fixed mx-auto w-full bg-white px-2 shadow-md sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between px-[1.2rem]">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <MdClose className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black" />
                  ) : (
                    <MdMenu className=" cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className=" flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className=" hidden sm:ml-6 sm:block">
                  <div className=" flex space-x-4">
                    <PopoverComponent />

                    {navigation
                      .filter((item) => !item.mobileOnly)
                      .map((item) => (
                        <a
                          // hidden={item.mobile}
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white "
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-lg font-bold"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex ">
                      <span className="sr-only">Open user menu</span>
                      <MdAccountCircle className="hidden cursor-pointer text-3xl  font-black text-[#8a939b] hover:text-black sm:block " />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <MdOutlineAccountBalanceWallet className="cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black" />
              </div>
            </div>
          </div>

          {/* <Transition.Root> */}
          <Transition
            enter="transition ease-in-out duration-[650ms] transform"
            enterFrom="-translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in-out duration-[650ms] transform"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-full opacity-0"
          >
            <Disclosure.Panel className=" h-screen bg-white pt-20 sm:hidden">
              <div className="space-y-1 divide-y px-2 pt-2 pb-3 text-center">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? " text-black " : "  hover:text-black",
                      "group flex h-16 items-center gap-2 rounded-md px-3 py-2 text-lg font-bold text-gray-600"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {/* <MdNewLabel className=" cursor-pointer text-4xl font-black text-[#8a939b] group-hover:text-black " /> */}
                    {item.icon}
                    {item.name}
                  </Disclosure.Button>
                ))}

                <div className="absolute bottom-0 left-0  ">
                  <div className="  mb-3 flex justify-center ">
                    <button className=" mx-5 h-14 w-full rounded-lg bg-orange-400 text-lg font-bold">
                      Connect Wallet
                    </button>
                  </div>
                  <div className=" absolute h-16 w-screen bg-gray-400 blur-sm"></div>
                  <div className="relative flex h-16 w-screen items-center justify-evenly bg-white ">
                    <AiFillGithub className=" cursor-pointer text-4xl font-black text-[#8a939b] hover:text-black " />
                    <AiFillTwitterCircle className=" cursor-pointer text-4xl font-black text-[#8a939b] hover:text-black " />
                    <AiFillRedditCircle className=" cursor-pointer text-4xl font-black text-[#8a939b] hover:text-black " />
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
