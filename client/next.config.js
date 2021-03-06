// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig

// MDX Support
const withMDXNextConfig = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDXNextConfig({
  images: {
    domains: ["ik.imagekit.io"],
  },
  reactStrictMode: true,
  trailingSlash: true,
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
