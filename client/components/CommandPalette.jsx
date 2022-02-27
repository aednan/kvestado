import React from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="fixed inset-0 p-4 pt-40"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <Combobox
        as="div"
        className="relative mx-auto max-w-2xl divide-y-2 divide-gray-100 overflow-hidden rounded-lg bg-white
        shadow-2xl ring-1 ring-black/5
        "
      >
        <div className="flex items-center gap-2 px-4">
          <MdSearch className="h-7 w-7 text-gray-500" />

          <Combobox.Input
            onChange={() => {
              //TODO:
            }}
            className="h-14 w-full border-0 bg-transparent text-base text-gray-800 
            placeholder:text-base placeholder:text-gray-400
             focus:border-0 focus:outline-none focus:ring-0 "
            placeholder="Search..."
          />
        </div>

        <Combobox.Options
          static
          className="max-h-96 divide-y divide-gray-50 overflow-y-auto py-4  text-base"
        >
          {/* should be done using a map */}
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>

          {/* to remove */}
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
          <Combobox.Option>
            {({ active }) => (
              <div
                className={`space-x-1 py-2 px-6 ${
                  active ? "bg-blue-500" : "bg-white"
                }  `}
              >
                <span className="font-medium text-gray-900">1- </span>
                <span className="text-gray-400">Lorem Lorem lorem</span>
              </div>
            )}
          </Combobox.Option>
        </Combobox.Options>
      </Combobox>
    </Dialog>
  );
}
