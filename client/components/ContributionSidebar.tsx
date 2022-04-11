/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ContributionCard from "./ContributionCard";
import InputField from "./InputField";
import { FaEthereum } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

type Props = {
  open: any;
  setOpen: any;
};

export default function ContributionSidebar(props: Props) {
  const [contributionAmount, setContributionAmount] = useState("");

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={props.setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="font-roboto text-lg font-bold text-gray-900">
                        Contribution
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => props.setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <InputField
                          title="Contribution Amount (ETH) *"
                          placeholder="Enter Amount"
                          value={contributionAmount}
                          onChangeFunction={(e: any) =>
                            setContributionAmount(e.target.value)
                          }
                        />

                        {/* <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {products.map((product) => (
                            <ContributionCard
                              key={product.id}
                              product={product}
                            />
                          ))}
                        </ul> */}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between  text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <div className="flex h-full  ">
                        <FaEthereum className="my-auto min-h-[1.3rem] min-w-[1.3rem] " />
                        <p className=" m-auto h-full max-w-[12rem] overflow-x-auto   ">
                          {" "}
                          {contributionAmount ? contributionAmount : "0.00"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-0.5 font-roboto text-sm text-gray-500">
                      Thank you for your contribution.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-sky-700 px-6 py-3 font-roboto text-base font-medium text-white shadow-sm hover:bg-sky-800"
                      >
                        CONTRIBUTE
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center font-roboto text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-roboto font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => props.setOpen(false)}
                        >
                          Back to campaign
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
