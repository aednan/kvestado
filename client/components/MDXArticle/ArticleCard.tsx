import Link from "next/link";
import { classNames } from "../../services/ToolsService";

export const ArticleCard = (props: any) => {
  const { meta } = props.article;

  return (
    <div
      className={classNames(
        meta.enabled
          ? "group opacity-100 hover:shadow-md"
          : "select-none opacity-30",
        " max-h-[17.5rem] w-full min-w-[19rem] divide-y overflow-hidden rounded-2xl border-2 border-gray-100 "
      )}
    >
      <div className=" relative aspect-square h-12 w-full overflow-hidden rounded-md rounded-b-none bg-gray-200 ">
        <div className="absolute bottom-2 left-0 max-h-7 max-w-[12rem] items-center overflow-clip bg-white px-1  align-middle shadow-md outline outline-1 outline-gray-300 group-hover:bg-cyan-100 ">
          <span className="h-full w-full select-none font-roboto text-base font-bold">
            {meta.readTime}{" "}
          </span>
          <span className=" max-w-sm font-roboto text-base font-thin text-gray-900">
            min read
          </span>
        </div>
      </div>
      <div className="flex h-60 flex-col justify-between px-6 py-4">
        <div className="flex flex-col  space-y-3 ">
          <div className="max-h-12 items-center justify-between overflow-clip ">
            <h2 className="font-roboto text-3xl font-bold ">{meta.title}</h2>
          </div>
          <div className="max-h-[3.5rem] overflow-y-auto overflow-x-hidden font-roboto text-lg text-gray-600">
            {meta.description}
          </div>
        </div>
        <div className="flex flex-col space-y-1 py-3">
          <span className="max-w-md overflow-clip  font-roboto text-xs font-medium text-black">
            Written by: @{meta.author}
          </span>
          <span className="max-w-md overflow-clip font-roboto text-xs font-medium  text-black">
            Published: {meta.publishedAt}
          </span>
          {meta.enabled && (
            <Link scroll={true} href={props.path}>
              <a className="bottom-0 inline-block border-separate border-t pt-3  text-center font-roboto text-sm font-semibold text-blue-500 hover:font-bold hover:text-blue-600 hover:drop-shadow-md">
                Read more &rarr;
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
