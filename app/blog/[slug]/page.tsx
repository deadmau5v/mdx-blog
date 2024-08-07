import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc"
import matter from "gray-matter";
import components from "@/components/mdx/options";


//functions
import { getPost } from "@/lib/posts-utils.mjs";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  // console.log("post:", post);
  const title = post.frontMatter.title;
  const description = post.frontMatter.description;

  // Define your base URL (or use an environment variable)
  const baseURL = "https://blog.d5v.cc/";

  // Construct the full canonical URL
  const canonicalUrl = `${baseURL}/${params.slug}`;

  return {
    title: title,
    description: description,
    // Add the canonical URL to the metadata
    alternates: {
      canonical: canonicalUrl,
    },
    // add other metadata fields as needed
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("data/posts"));
  const params = [];

  for (const filename of files) {
    // Read the content of the file
    const fullPath = path.join("data/posts", filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Extract the front matter to get the date
    // Assuming you use gray-matter or a similar library to parse front matter
    const { data: frontMatter } = matter(fileContents);

    // Parse the date and compare with the current date
    const postDate = new Date(frontMatter.date);
    const currentDate = new Date();
    const isFuture = postDate > currentDate;

    if (!isFuture) {
      params.push({ slug: filename.replace(".mdx", "") });
    }

  }

  return params;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  //
  const props = await getPost(params);

  return (
    <div className="flex flex-col gap-3 sm:w-2xl sm:max-w-2xl max-w-xs">
      <div className="mb-2">
        <h1 className="text-5xl font-bold mb-2">{props.frontMatter.title}</h1>
        <div>{props.frontMatter.date}</div>
        <div>By: {props.frontMatter.author}</div>
      </div>
      <div className="flex gap-4"></div>
      <article className="mdx">
        <MDXRemote
          source={props.content}
          components={{ ...components}}
          />
      </article>
    </div>
  );
}
