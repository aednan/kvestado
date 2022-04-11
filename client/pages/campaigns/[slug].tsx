import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ContributionSidebar from "../../components/ContributionSidebar";
import LoadingSpinner from "../../components/LoadingSpinner";
import SliderButton from "../../components/SliderButton";
import useResource from "../../services/hooks/useResource";

// import Markdown from "react-markdown";

type props = {};

function Campaign(props: props) {
  // Contribution slider
  const [openContribution, setOpenContribution] = useState(false);

  const router = useRouter();
  const [slugValue, setSlugValue] = useState<any>(undefined);
  const { data, loading } = useResource({
    resourcePath: "contract/api/get_campaign",
    params: {
      slug: slugValue,
    },
    skip: slugValue ? false : true,
    withCredentials: false,
  });

  useEffect(() => {
    if (router && router.query) {
      const { slug } = router.query;
      setSlugValue(slug);
    }
  }, [router]);

  return !loading && data !== undefined ? (
    <>
      <SliderButton setOpenContribution={setOpenContribution} />
      <ContributionSidebar
        open={openContribution}
        setOpen={setOpenContribution}
      />
      <article className=" divide-y-2 px-7 pt-16 pb-14 ">
        {/* {title && ( */}
        <div className="relative  mb-7">
          <h1 className="leading-tighter mx-auto mb-8 w-full max-w-7xl text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl">
            {data?.title}
          </h1>
          <div className="mx-auto max-w-5xl justify-center rounded-md bg-cover">
            <img
              // layout="fill"
              alt="campaign_cover"
              src={`${process.env.NEXT_PUBLIC_URLENDPOINT}${data.coverPicturePath}`}
              className=" mx-auto rounded-md "
            />
          </div>
        </div>
        <ReactMarkdown className="prose prose-stone mx-auto max-w-4xl pt-10 prose-pre:max-h-80 prose-pre:overflow-auto prose-img:rounded-md lg:prose-xl">
          {data?.description}
        </ReactMarkdown>
      </article>
    </>
  ) : (
    <LoadingSpinner />
  );
}

export default Campaign;
