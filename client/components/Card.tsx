import React from "react";

type Props = {};

const products = [
  {
    id: 1,
    title: "Basic Tee",
    slug: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    createdAt: "02/02/2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    title: "Basic Tee",
    slug: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    createdAt: "02/02/2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    title: "Basic Tee",
    slug: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    createdAt: "02/02/2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 4,
    title: "Basic Tee",
    slug: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    createdAt: "02/02/2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },

  // More products...
];

export default function Card({}: Props) {
  return (
    <div className="pb-2">
      <div className="mx-auto flex max-w-sm flex-col rounded-lg py-4 px-4 sm:max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="self-center border-y-2 py-1 text-center font-roboto text-2xl font-bold tracking-tight text-gray-900 ring-0">
          Existing Campaigns
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className=" group divide-y overflow-hidden rounded-2xl border-2 border-gray-100 hover:shadow-md"
            >
              <div className=" relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 ">
                <div className="absolute bottom-2 left-0 max-h-7 max-w-[12rem] items-center overflow-clip bg-white px-1  align-middle shadow-md outline outline-1 outline-gray-300 group-hover:bg-cyan-100 ">
                  <span className="h-full w-full select-none font-roboto text-base font-bold">
                    by{" "}
                  </span>
                  <span className=" max-w-sm select-all font-roboto text-base font-thin text-gray-900">
                    XilyanD
                  </span>
                </div>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className=" h-full w-full object-fill object-center"
                />
              </div>
              <div className="flex h-60 flex-col justify-between px-6 py-4">
                <div className="flex flex-col  space-y-3 ">
                  <div className="max-h-12 items-center justify-between overflow-clip ">
                    <h2 className="font-semibold ">{product.title}</h2>
                  </div>
                  <div className="max-h-[4.5rem] overflow-y-auto overflow-x-hidden text-base text-gray-600">
                    {product.description}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="max-w-md overflow-clip py-3 text-sm font-semibold tracking-wide text-gray-800">
                    {product.createdAt}
                  </span>
                  <a
                    href="#"
                    className="bottom-0 inline-block border-separate border-t pt-3 pb-1 text-center text-sm font-semibold text-blue-500 hover:font-bold hover:text-blue-600 hover:drop-shadow-md"
                  >
                    View Campaign &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
