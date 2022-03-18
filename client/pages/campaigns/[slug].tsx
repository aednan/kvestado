import React, { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ContributionSidebar from "../../components/ContributionSidebar";
import AuthContext from "../../contexts/AuthContext";
// to be removed
// import { userAuthentication } from "../../services/Web3Service";
// /to be removed

// import Markdown from "react-markdown";

type campaignProps = {
  campaignData: any;
};

function campaign({}: campaignProps) {
  // to be removed
  // const { state } = useContext(AuthContext);
  // /to be removed

  // the slug of the campaign should be, the username of the campaign creator wallet public address + campaign random identifier

  const markdown = `# sjdjkjsdjksd
  ![Alt text](https://hddesktopwallpapers.in/wp-content/uploads/2015/09/meerkat-picture.jpg "a title")
  skldsldklklklk
  # sjdjkjsdjksdklsdkkldlk
  `;

  return (
    <article className=" divide-y-2 px-7 pt-32 pb-14 ">
      {/* to be removed */}
      {/* <span onClick={userAuthentication}>
        test userAthentication function click
      </span> */}
      {/* <span
        onClick={() => {
          console.log(state.isAuthenticated);
          console.log(state.walletAddress);
        }}
      >
        test
      </span> */}
      {/* /to be removed */}

      <ContributionSidebar />
      {/* {title && ( */}
      <div className="mb-7">
        <h1 className="leading-tighter mx-auto mb-8 w-full max-w-7xl text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl">
          {/* {title} */}
          sdkjfjkkjsdfkj skjfkjsdjkf sdhjsd sdjs kjsdk dsj sdjk sjdfjskjdf
          sdjkfjksdkjfjsd fjsdkjfkjsd
        </h1>
        {/* )} */}
        <div className="mx-auto max-w-5xl rounded-md bg-cover">
          <img
            alt="campaign_cover"
            src="https://wallpapercave.com/wp/u2QLGhj.jpg"
            className=" rounded-md "
          />
        </div>
      </div>
      <ReactMarkdown
        className="prose prose-stone mx-auto max-w-4xl pt-10 prose-pre:max-h-80 prose-pre:overflow-auto prose-img:rounded-md lg:prose-xl"
        children={markdown}
      />
    </article>
    // </div>
  );
}

export default campaign;
