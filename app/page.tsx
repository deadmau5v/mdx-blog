import Link from "next/link";
import SelectLimitPosts from "./blog/select-limit-posts";
import SearchPosts from "./blog/search-posts";
import SortPosts from "./blog/sort-posts";
import { getPosts } from "@/lib/posts-utils.mjs";
import BlogPostList from "./blog/blog-post-list";

// interface BlogPost {
//   slug: string;
//   type: string;
//   date: string;
//   title: string;
//   description: string;
//   image: string;
//   author: string;
//   tags: string[];
//   formattedDate?: string;
// }

// const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const postsPerPage =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const searchTerm = searchParams.search || "";
  const sort = searchParams.sort || "date_desc";

  const { posts: blogs, totalPosts } = getPosts(
    "",
    postsPerPage,
    currentPage,
    searchTerm,
    sort as string
  );

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  //button disabled styles
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  const isDateDesc = sort === "date_desc";

  // Utility function to trim description
  function trimDescription(description: string) {
    const wordLimit = 10;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    } else {
      return description;
    }
  }

  return (
    <div className="flex flex-col gap-4  max-w-xl">
      {/* 标题 */}
      <h1 className="text-5xl sm:text-7xl font-bold text-center">
        <span className="inline-block primary-bg text-sm font-semibold px-2 py-1 rounded-full align-text-top mt-5 mr-2">new</span>
        Welcome to <span className="primary-color">Deadmau5v</span>Blog
      </h1>

      {/* 分割线 */}
      <hr />

      {/* 公告 */}
      <div className="flex justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          旧的博客 <a className="primary-color" href="https://d5v.cc/">https://d5v.cc/</a> 已停止更新
        </h2>
      </div>
  
      <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-center">最新文章</h2>
      <hr className="" />

      <div className="flex flex-col gap-8 pb-6 sm:w-xl max-w-xl sm:max-w-2xl">

        <div className="flex gap-4 justify-between items-center">
          <SearchPosts
            currentPage={currentPage}
            limit={postsPerPage}
            numBlogs={blogs.length}
            sort={sort as string}
          />
          <SortPosts
            sort={sort as string}
            currentPage={currentPage}
            limit={postsPerPage}
            searchTerm={searchTerm as string}
          />
        </div>
        <div>
          {blogs.length === 0 ? (
            <div className="text-center text-lg flex flex-col justify-evenly ">
              <span className="pb-[100px] pt-[100px]">
                此页面未找到博客文章...
              </span>
            </div>
          ) : (
            <BlogPostList blogs={blogs} trimDescription={trimDescription} />
          )}

          <div
            id="pagination"
            className="flex gap-2 pt-8 pb-2 items-center justify-center"
          >
            {currentPage === 1 ? (
              <span className={`${disabledLinkStyle}`}>{`<<`}</span>
            ) : (
              <span>
                <Link
                  href={`/?limit=${postsPerPage}&page=${1}${searchTerm ? `&search=${searchTerm}` : ""
                    }${!isDateDesc ? `&sort=${sort}` : ""}`}
                >{`<<`}</Link>
              </span>
            )}
            {isPreviousDisabled ? (
              <span className={`${disabledLinkStyle}`}>👈</span>
            ) : (
              <Link
                className={``}
                href={`/?limit=${postsPerPage}&page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ""
                  }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >
                👈
              </Link>
            )}

            <span>{`${currentPage}`} - {`${totalPages}`}</span>

            {isNextDisabled ? (
              <span className={`${disabledLinkStyle}`}>👉</span>
            ) : (
              <Link
                className={``}
                href={`/?limit=${postsPerPage}&page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ""
                  }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >
                👉
              </Link>
            )}
            {currentPage === totalPages ? (
              <span className={`${disabledLinkStyle}`}>{`>>`}</span>
            ) : (
              <span>
                <Link
                  href={`/?limit=${postsPerPage}&page=${totalPages}${searchTerm ? `&search=${searchTerm}` : ""
                    }${!isDateDesc ? `&sort=${sort}` : ""}`}
                >{`>>`}</Link>
              </span>
            )}
          </div>
          <SelectLimitPosts
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            searchTerm={searchTerm as string}
            numBlogs={blogs.length}
            sort={sort as string}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
