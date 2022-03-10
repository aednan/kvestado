import Link from "next/link";

export const ArticleCard = (props: any) => {
  const { meta } = props.article;

  return (
    <article className="mt-20">
      <h1>{meta.title}</h1>
      <div className="details">
        <p>{meta.description}</p>
        <span>{meta.publishedAt}</span>
        <span role="img" aria-label="one coffee">
          ☕ {meta.readTime + " min read"}
        </span>
      </div>

      <Link scroll={true} href={props.path}>
        <a>Read more &rarr;</a>
      </Link>
    </article>
  );
};
