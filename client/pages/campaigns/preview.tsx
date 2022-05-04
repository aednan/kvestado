import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {};

const Preview = (props: Props) => {
  const router = useRouter();
  const [previewData, setPreviewData] = useState<any>("");

  useEffect(() => {
    if (router !== undefined) {
      setPreviewData(router?.query.data);
    }
  }, [router]);
  return (
    <ReactMarkdown className="prose prose-stone mx-auto max-w-4xl px-5 py-20 prose-pre:max-h-80 prose-pre:overflow-auto prose-img:max-h-[70rem] prose-img:max-w-full prose-img:rounded-md lg:prose-xl">
      {previewData !== "" && previewData !== undefined
        ? atob(previewData)
        : " # NO RESULT FOUND"}
    </ReactMarkdown>
  );
};

export default Preview;
