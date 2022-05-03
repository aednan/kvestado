import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ContributionSidebar from "../../components/ContributionSidebar";
import LoadingSpinner from "../../components/LoadingSpinner";
import SliderButton from "../../components/SliderButton";
import AuthContext from "../../contexts/AuthContext";
import useResource from "../../services/hooks/useResource";

// import Markdown from "react-markdown";

type props = {
  initialData: any;
};

function Campaign(props: props) {
  // Contribution slider
  const [openContribution, setOpenContribution] = useState(false);
  const { state } = useContext(AuthContext);

  const router = useRouter();
  const [slugValue, setSlugValue] = useState<any>(undefined);
  const { data, loading } = useResource({
    resourcePath: "contract/api/get_campaign",
    params: {
      slug: slugValue,
    },
    skip: slugValue ? false : true,
    withCredentials: false,
    fallbackData: props.initialData,
  });

  useEffect(() => {
    if (router && router.query) {
      const { slug } = router.query;
      setSlugValue(slug);
    }
  }, [router]);

  return !loading && data !== undefined ? (
    <>
      <div className="fixed top-20 left-0 max-h-6 w-6 max-w-[12rem] items-center overflow-hidden bg-white px-1 align-middle shadow-md outline outline-1 outline-gray-300 hover:w-fit group-hover:bg-cyan-100 ">
        <span className="h-full w-full select-none font-roboto text-base font-bold">
          ID{" "}
        </span>
        <span className=" max-w-sm select-all overflow-hidden font-roboto text-base font-bold text-sky-600">
          {data.campaignId}
        </span>
      </div>
      {state.isAuthenticated && data.campaignId !== undefined && (
        <>
          <SliderButton setOpenContribution={setOpenContribution} />
          <ContributionSidebar
            campaignId={data.campaignId}
            campaignOwnerWalletAddress={data.campaignOwner}
            open={openContribution}
            setOpen={setOpenContribution}
          />
        </>
      )}
      <article className=" divide-y-2 px-7 pt-16 pb-14 ">
        {/* {title && ( */}
        <div className="relative mb-7">
          <h1 className="leading-tighter mx-auto mb-8 w-full max-w-7xl text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl">
            {data?.title}
          </h1>
          <div className="mx-auto max-h-[64rem] max-w-5xl justify-center rounded-md bg-cover">
            <img
              // layout="fill"
              alt="campaign_cover"
              src={
                data.coverPicturePath
                  ? `${process.env.NEXT_PUBLIC_URLENDPOINT}${data.coverPicturePath}`
                  : "/img/campaignD.png"
              }
              className=" mx-auto rounded-md "
            />
          </div>
        </div>
        <ReactMarkdown className="prose prose-stone mx-auto max-w-4xl px-5 py-20 prose-pre:max-h-80 prose-pre:overflow-auto prose-img:max-h-[70rem] prose-img:w-full prose-img:rounded-md lg:prose-xl">
          {data?.description}
        </ReactMarkdown>
      </article>

      {state.isAuthenticated && (
        <span
          onClick={() => setOpenContribution(true)}
          className="mx-auto mb-10 w-full max-w-[16rem] cursor-pointer select-none rounded-md border py-2 px-7 text-center font-roboto text-lg  font-bold text-gray-700 shadow-sm hover:bg-slate-50 hover:shadow-md"
        >
          CONTRIBUTION PANEL
        </span>
      )}
    </>
  ) : (
    <LoadingSpinner />
  );
}

export async function getStaticPaths() {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/`,
    timeout: 1500,
  });
  let response: any = [];
  try {
    response = await axios.get(
      "http://localhost:8080/contract/api/get_campaigns_slugs"
    );
    response = response.data;
  } catch (error: any) {
    // console.log(error);
  }

  return {
    paths: response,
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/`,
    timeout: 1500,
  });
  let response: any = [];
  try {
    response = await instance.get("contract/api/get_campaign", {
      params: { slug: context.params.slug },
    });
    response = response.data;
  } catch (error: any) {
    // console.log(error);
  }

  if (response.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { initialData: response }, // will be passed to the page component as props
    // revalidate: 10,
  };
}

export default Campaign;
