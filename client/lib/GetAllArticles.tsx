export function getAllArticles(r:any) {
    return r.keys().map((fileName:any) => JSON.stringify(({
      slug: fileName.substr(1).replace(/\.mdx$/, ""),
      meta: r(fileName).meta
    })));
  }
  
//   export const posts = importAll(
//     require.context("./pages/blog/", true, /\.mdx$/)
//   );