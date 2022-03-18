import React from "react";
import { ArticleCard } from "../../components/MDXArticle/ArticleCard";
import { getAllArticles } from "../../services/GetAllArticles";

// to display all articles

type Props = {};

const Articles = (allArticles: any, props: Props) => {
  return (
    <div className="mx-auto mt-16 flex max-w-sm flex-col rounded-lg py-4 px-4 sm:max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="self-center border-y-2 py-1 text-center font-roboto text-2xl font-bold tracking-tight text-gray-900 ring-0">
        Documentation
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {allArticles.allArticles.map(JSON.parse).map((article: any) => (
          <ArticleCard
            key={`docs${article.slug}`}
            path={`/docs/r${article.slug}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;

export async function getStaticProps() {
  const allArticles = getAllArticles(
    require.context("./r/", false, /\.mdx$/, "sync")
  );

  return {
    props: {
      allArticles,
    },
  };
}
