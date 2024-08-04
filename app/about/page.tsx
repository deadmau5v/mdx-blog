import { getAboutPost } from "@/lib/posts-utils.mjs";
import { MDXRemote } from "next-mdx-remote/rsc";

import Quiz from "@/components/mdx/quiz";
import CustomImage from "@/components/mdx/image";
import CustomButton from "@/components/mdx/button";
import Button from "@/components/mdx/button";

export default async function Settings() {
  const post = await getAboutPost();

  const components = {
    CustomImage,
    Quiz,
    CustomButton,
    Button,
  };

  return <>
    <div className="flex flex-col gap-3 sm:w-2xl sm:max-w-2xl max-w-xs">
      <div className="mb-2">
        <h1 className="text-5xl font-bold mb-2">关于我</h1>
      </div>

      <div className="flex gap-4"></div>
      <article className="mdx">
        <MDXRemote source={post.content} components={components} />
      </article>
    </div>
  </>;

}