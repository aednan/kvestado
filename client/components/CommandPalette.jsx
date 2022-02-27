import React, { Fragment, useEffect } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function CommandPalette({ cPData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredData = query
    ? cPData.filter((data) =>
        data.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog onClose={setIsOpen} className="fixed inset-0 p-4 pt-40">
        <Transition.Child
          enter="ease-out duration-300 "
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave=" ease-in duration-200 "
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300 "
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave=" ease-in duration-200 "
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="relative mx-auto max-w-2xl divide-y-2 divide-gray-100 overflow-hidden rounded-lg bg-white
        shadow-2xl ring-1 ring-black/5
        "
            onChange={() => {
              //TODO: Navigation
            }}
          >
            <div className="flex items-center gap-2 px-4">
              <MdSearch className="text-3xl text-gray-400" />

              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                className="h-[4.3rem] w-full border-0 bg-transparent text-xl font-bold 
            text-gray-800 placeholder:text-lg placeholder:text-gray-400
             focus:border-none focus:outline-none focus:ring-0 "
                placeholder="Search"
              />

              <span className="cursor-pointer rounded-md border p-1 text-xs font-bold  text-gray-400 hover:drop-shadow-md">
                ESC
              </span>
            </div>

            {filteredData.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 divide-y divide-gray-50 overflow-y-auto py-4  text-base"
              >
                {filteredData.map((dataObject) => (
                  <Combobox.Option key={dataObject.id}>
                    {({ active }) => (
                      <div
                        className={`space-x-2 py-2 px-6 ${
                          active ? "bg-blue-500" : "bg-white"
                        }  `}
                      >
                        <span className="text-base font-medium text-gray-900">
                          {dataObject.title}
                        </span>
                        <span className="text-sm text-gray-400">
                          {dataObject.description}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query && filteredData.length === 0 && (
              <p className="p-4 text-base text-gray-500">No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
