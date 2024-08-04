const {
  remarkCodeHike,
} = require("@code-hike/mdx");
const { tr } = require("date-fns/locale");


const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkCodeHike, { theme: "nord" }]
    ],
  },
})

mdxOptions = {
  remarkPlugins: [
    [
      remarkCodeHike,
      {
        lineNumbers: true,
        showCopyButton: true,
        theme: "dark-plus",
        skipLanguages: ["mermaid"],
        staticMediaQuery: "not screen, (max-width: 768px)",
        autoImport: true,
        autoLink: true,
      },
    ],
  ],
};


/** @type {import('next').NextConfig} */


const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'cdn1.d5v.cc',
      },
      {
        hostname: 'cdn.d5v.cc',
      },
      {
        hostname: 'd5v.cc',
      },
      {
        hostname: 'blog.d5v.cc',
      },
      {
        hostname: 'www.d5v.cc',
      },
    ]
  }
};


module.exports = withMDX(nextConfig);