type Props = {
  isOpen: boolean;
  setIsOpen: any;
  transactionHash: string;
  description: string;
};

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineCheck } from "react-icons/md";

export default function CustomDialogBox(props: Props) {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.setIsOpen}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className=" mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <MdOutlineCheck
                      className="h-9 w-9 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className=" pt-5 text-center sm:mt-0 ">
                    <Dialog.Title
                      as="h3"
                      className="font-roboto text-lg font-bold leading-6 text-gray-900"
                    >
                      Your Transaction is Started!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="mx-auto max-w-md font-roboto  text-sm text-gray-500">
                        {props.description}
                      </p>

                      <div className="my-5 mx-auto max-w-[26] overflow-hidden font-roboto text-xs font-semibold text-sky-700">
                        <a
                          href={`${process.env.NEXT_PUBLIC_NETWORK}/tx/${props.transactionHash}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {props.transactionHash}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center border-t-2 bg-gray-50 px-4 py-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => props.setIsOpen(false)}
                >
                  Got it, Thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
