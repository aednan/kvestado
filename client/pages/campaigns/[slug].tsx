import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ContributionSidebar from "../../components/ContributionSidebar";
import LoadingSpinner from "../../components/LoadingSpinner";
import AuthContext from "../../contexts/AuthContext";
import useResource from "../../services/hooks/useResource";

// import Markdown from "react-markdown";

type props = {};

function campaign(props: props) {
  const router = useRouter();
  const [slugValue, setSlugValue] = useState<any>(undefined);
  const { data, mutate, error, loading } = useResource({
    resourcePath: "contract/api/get_campaign",
    params: {
      slug: slugValue,
    },
    skip: slugValue ? false : true,
  });

  useEffect(() => {
    if (router && router.query) {
      const { slug } = router.query;
      setSlugValue(slug);
    }
  }, [router]);

  // to be removed
  // const { state } = useContext(AuthContext);
  // /to be removed

  // the slug of the campaign should be, the username of the campaign creator wallet public address + campaign random identifier

  const markdown = `# sjdjkjsdjksd
  ![Alt text](https://hddesktopwallpapers.in/wp-content/uploads/2015/09/meerkat-picture.jpg "a title")
  skldsldklklklk
  # sjdjkjsdjksdklsdkkldlk
  `;
  return !loading && data !== undefined ? (
    <article className=" divide-y-2 px-7 pt-16 pb-14 ">
      <ContributionSidebar />
      {/* {title && ( */}
      <div className="mb-7">
        <h1 className="leading-tighter mx-auto mb-8 w-full max-w-7xl text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl">
          {data?.title}
          {/* sdkjfjkkjsdfkj skjfkjsdjkf sdhjsd sdjs kjsdk dsj sdjk sjdfjskjdf
          sdjkfjksdkjfjsd fjsdkjfkjsd */}
        </h1>
        {/* )} */}
        <div className="mx-auto max-w-5xl justify-center rounded-md bg-cover">
          <img
            alt="campaign_cover"
            src={`${process.env.NEXT_PUBLIC_URLENDPOINT}${data.coverPicturePath}`}
            className=" mx-auto rounded-md "
          />
        </div>
      </div>
      <ReactMarkdown
        className="prose prose-stone mx-auto max-w-4xl pt-10 prose-pre:max-h-80 prose-pre:overflow-auto prose-img:rounded-md lg:prose-xl"
        children={data?.description}
      />
    </article>
  ) : (
    <LoadingSpinner />
  );
}

export default campaign;
