import React, { ReactNode, useEffect } from "react";

const ArticleLayout = ({
  children,
  meta,
}: {
  children: ReactNode;
  meta: any;
}) => {
  const { title, description, coverImage, publishedAt, readTime } = meta;
  return (
    <article className=" px-7 pt-16 pb-14 ">
      {title && (
        <h1 className="leading-tighter mx-auto mb-8 w-full  max-w-5xl text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl">
          {title}
          {/* Build und Ausführung des Java-Programms */}
        </h1>
      )}
      <main className="prose prose-stone mx-auto max-w-5xl prose-pre:max-h-80 prose-pre:overflow-auto lg:prose-xl">
        {children}
      </main>
    </article>
  );
};

export default ArticleLayout;
