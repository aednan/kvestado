import { Fragment, useContext } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillRedditCircle,
  AiFillSetting,
} from "react-icons/ai";
import { FaUser, FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineAccountBalanceWallet,
  MdMenu,
  MdClose,
  MdAddCircleOutline,
  MdLibraryBooks,
  MdAppRegistration,
  MdSearch,
  MdDarkMode,
  MdLogout,
} from "react-icons/md";
import "../styles/Navbar.module.css";

import PopoverComponent from "./PopoverComponent";
import UserSettingsContext from "../contexts/UserSettingsContext";
import Link from "next/link";
import AuthContext from "../contexts/AuthContext";
import useWeb3Service from "../services/hooks/useWeb3Service";
import { classNames } from "../services/ToolsService";

const navigation = [
  //   { name: "Dashboard", href: "#", current: true },
  {
    name: "Create",
    href: "/campaigns/create",
    current: false,
    icon: (
      <MdAddCircleOutline className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: false,
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    current: false,
    icon: (
      <MdAppRegistration className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: false,
  },
  // docs how the contract works
  {
    name: "Resources",
    href: "/docs",
    current: false,
    icon: (
      <MdLibraryBooks className=" cursor-pointer text-3xl font-black text-[#8a939b] group-hover:text-black " />
    ),
    mobileOnly: true,
  },
];

export default function Navbar() {
  const userSettingsContext = useContext(UserSettingsContext);
  const { state } = useContext(AuthContext);

  const { connectWallet, logout } = useWeb3Service();

  return (
    <Disclosure
      as="nav"
      className="fixed z-20 w-full overflow-x-hidden bg-transparent"
    >
      {({ open }) => (
        <>
          <div className=" fixed mx-auto w-full flex-initial bg-white px-2 shadow-md sm:px-4 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
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
                <div className=" flex flex-shrink-0 items-center ">
                  <Link href="/">
                    <span className="cursor-pointer select-none border-y-2 bg-gradient-to-br from-gray-900 to-slate-300 bg-clip-text align-baseline font-roboto text-2xl font-light  text-transparent odd:p-1 hover:to-cyan-300">
                      KVESTADO
                    </span>
                  </Link>
                  {/* TODO: onClick = redirect to home */}
                  {/* <img
                    className="block h-8 w-auto lg:hidden"
                    src="/img/logo.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden h-8 w-auto bg-green-300 lg:block"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                </div>
                <div className=" hidden w-full pr-10 sm:ml-6 sm:block">
                  <div className=" flex space-x-6 ">
                    <PopoverComponent />

                    {navigation
                      .filter((item) => !item.mobileOnly)
                      .map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            // hidden={item.mobile}
                            className={classNames(
                              item.current
                                ? " text-opacity-100 "
                                : "text-opacity-75",
                              "rounded-md py-2 font-roboto text-lg font-black text-gray-700 hover:text-opacity-100"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}

                    <div
                      onClick={() => {
                        userSettingsContext.setCPaletteOpen(
                          !userSettingsContext.isCPaletteOpen
                        );
                      }}
                      className=" group hidden w-full max-w-3xl cursor-pointer items-center gap-2 rounded-lg border-2 px-4 hover:shadow-md md:flex"
                    >
                      <MdSearch className="text-3xl text-gray-400 group-hover:text-gray-700" />

                      <input
                        readOnly
                        className="
                         h-10 w-full
                        bg-transparent text-xl text-gray-800 placeholder:font-roboto 
            placeholder:text-base placeholder:text-gray-400 focus:border-none
             focus:outline-none focus:ring-0 lg:placeholder:text-lg "
                        placeholder="Search"
                      />

                      <span className="cursor-pointer rounded-md border p-1 text-xs font-bold  text-gray-400 hover:drop-shadow-md ">
                        Ctrl+Z
                      </span>
                    </div>
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

                <MdSearch
                  onClick={() => {
                    userSettingsContext.setCPaletteOpen(
                      !userSettingsContext.isCPaletteOpen
                    );
                  }}
                  className="hidden cursor-pointer text-3xl text-gray-400 hover:text-gray-700 sm:block md:hidden"
                />
                {/* Profile dropdown */}
                {state.isAuthenticated && (
                  <Menu as="div" className="relative block">
                    <div>
                      <Menu.Button className="flex ">
                        <span className="sr-only">Open user menu</span>
                        <FaRegUserCircle className=" cursor-pointer  text-[1.8rem]  font-black text-[#8a939b] hover:text-black sm:block " />
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
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y-2 rounded-md border-2  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link href="/user/username">
                            <div className="group flex space-x-3 px-4 py-1 align-middle hover:cursor-pointer  hover:bg-gray-100">
                              <FaUser className=" my-auto  justify-center  align-middle text-base font-black text-slate-500 group-hover:bg-gray-100  group-hover:text-gray-700" />
                              <span className="  font-mono py-2 text-base  text-slate-500 group-hover:bg-gray-100 group-hover:text-gray-700">
                                Profile
                              </span>
                            </div>
                          </Link>
                        </Menu.Item>

                        <Menu.Item>
                          <Link href="/user/settings">
                            <div className="group flex space-x-3 py-1 px-4 align-middle hover:cursor-pointer  hover:bg-gray-100">
                              <AiFillSetting className=" my-auto  justify-center  align-middle text-xl font-black text-slate-500 group-hover:bg-gray-100  group-hover:text-gray-700" />
                              <a className="  font-mono py-2 text-base text-slate-500 group-hover:bg-gray-100 group-hover:text-gray-700">
                                Settings
                              </a>
                            </div>
                          </Link>
                        </Menu.Item>

                        <Menu.Item>
                          {state.isAuthenticated ? (
                            <div
                              className=" group flex space-x-3 px-4 align-middle hover:cursor-pointer  hover:bg-gray-100"
                              onClick={async () => {
                                await logout();
                              }}
                            >
                              <MdLogout className="my-auto  justify-center align-middle  text-xl  text-slate-500 group-hover:bg-gray-100  group-hover:text-gray-700" />
                              <span className="font-mono py-2 text-base font-medium  text-slate-500 group-hover:bg-gray-100 group-hover:text-gray-700">
                                Logout
                              </span>
                            </div>
                          ) : (
                            <span
                              onClick={async () => {
                                if (!state.isSubmitBtnDisabled) {
                                  await connectWallet();
                                }
                              }}
                              className="font-mono block cursor-pointer px-4 py-2 text-center text-base font-bold text-gray-700 hover:bg-gray-100"
                            >
                              Connect Wallet
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {!state.isAuthenticated && (
                  <MdOutlineAccountBalanceWallet
                    title="Connect Wallet"
                    onClick={async () => {
                      if (!state.isSubmitBtnDisabled) {
                        await connectWallet();
                      }
                    }}
                    className="cursor-pointer text-3xl font-black text-[#8a939b] hover:text-black"
                  />
                )}
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
            <Disclosure.Panel className=" h-screen overflow-auto bg-white pt-20 sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 text-center">
                <div
                  onClick={() => {
                    userSettingsContext.setCPaletteOpen(
                      !userSettingsContext.isCPaletteOpen
                    );
                  }}
                  className="group flex cursor-pointer items-center gap-2 border-x border-b px-4  "
                >
                  <MdSearch className="text-3xl text-gray-400 group-hover:text-gray-800" />
                  <input
                    readOnly
                    className="h-12 w-full border-0 bg-transparent text-xl  text-gray-800
            placeholder:font-roboto placeholder:text-lg placeholder:text-gray-400
             focus:border-none focus:outline-none focus:ring-0 "
                    placeholder="Search"
                  />

                  <span className="cursor-pointer rounded-md border p-1 text-xs font-bold  text-gray-400 hover:drop-shadow-md ">
                    Ctrl+Z
                  </span>
                </div>
                <div className="divide-y">
                  {navigation.map((item) => (
                    <Disclosure.Button key={item.name} as="div">
                      <Link href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? " text-black "
                              : "  hover:text-black",
                            "group flex h-16 items-center gap-2 rounded-md px-3 py-2 font-roboto text-lg font-bold text-gray-600"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.icon}
                          {item.name}
                        </a>
                      </Link>

                      {/* <MdNewLabel className=" cursor-pointer text-4xl font-black text-[#8a939b] group-hover:text-black " /> */}
                    </Disclosure.Button>
                  ))}

                  <Switch.Group
                    as="div"
                    className="group flex h-16   items-center justify-between rounded-md  px-3 py-2 text-lg font-bold text-gray-600 hover:text-black"
                  >
                    <Switch.Label className="flex cursor-pointer gap-2">
                      <MdDarkMode className=" text-3xl font-black text-[#8a939b] group-hover:text-black " />
                      Night Mode
                    </Switch.Label>
                    <Switch
                      checked={userSettingsContext.nModeEnabled}
                      onChange={userSettingsContext.setNModeEnabled}
                      className={classNames(
                        userSettingsContext.nModeEnabled
                          ? "bg-cyan-300"
                          : "bg-gray-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 "
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          userSettingsContext.nModeEnabled
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out "
                        )}
                      ></span>
                    </Switch>
                  </Switch.Group>
                </div>

                <div className="absolute bottom-0 left-0  ">
                  {!state.isAuthenticated && (
                    <div className="  mb-3 flex justify-center ">
                      <button
                        onClick={async () => {
                          if (!state.isSubmitBtnDisabled) {
                            await connectWallet();
                          }
                        }}
                        className=" 
                        mx-5 h-14 w-full cursor-pointer rounded-md 
                        border border-sky-800 bg-sky-700 px-7
                        py-4 text-lg font-bold leading-none text-white hover:shadow-md"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
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
