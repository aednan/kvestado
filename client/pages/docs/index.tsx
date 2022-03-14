import React from "react";
import { ArticleCard } from "../../components/MDXArticle/ArticleCard";
import { getAllArticles } from "../../services/GetAllArticles";

// to display all articles

type Props = {};

const Articles = (allArticles: any, props: Props) => {
  return (
    <>
      {allArticles.allArticles.map(JSON.parse).map((article: any) => (
        <ArticleCard
          key={`docs${article.slug}`}
          path={`/docs/r${article.slug}`}
          article={article}
        />
      ))}
    </>
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
