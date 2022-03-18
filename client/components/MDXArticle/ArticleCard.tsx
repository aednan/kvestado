import Link from "next/link";

export const ArticleCard = (props: any) => {
  const { meta } = props.article;

  return (
    <div className=" group divide-y overflow-hidden rounded-2xl border-2 border-gray-100 hover:shadow-md">
      <div className=" relative aspect-square h-12 w-full overflow-hidden rounded-md rounded-b-none bg-gray-200 ">
        <div className="absolute bottom-2 left-0 max-h-7 max-w-[12rem] items-center overflow-clip bg-white px-1  align-middle shadow-md outline outline-1 outline-gray-300 group-hover:bg-cyan-100 ">
          <span className="h-full w-full select-none font-roboto text-base font-bold">
            {meta.readTime}{" "}
          </span>
          <span className=" max-w-sm select-all font-roboto text-base font-thin text-gray-900">
            min read
          </span>
        </div>
      </div>
      <div className="flex h-60 flex-col justify-between px-6 py-4">
        <div className="flex flex-col  space-y-3 ">
          <div className="max-h-12 items-center justify-between overflow-clip ">
            <h2 className="font-semibold ">{meta.title}</h2>
          </div>
          <div className="max-h-[4.5rem] overflow-y-auto overflow-x-hidden text-base text-gray-600">
            {meta.description}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="max-w-md overflow-clip py-3 text-sm font-semibold tracking-wide text-gray-800">
            {meta.publishedAt}
          </span>
          <Link scroll={true} href={props.path}>
            <a className="bottom-0 inline-block border-separate border-t pt-3 pb-1 text-center text-sm font-semibold text-blue-500 hover:font-bold hover:text-blue-600 hover:drop-shadow-md">
              Read more &rarr;
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
