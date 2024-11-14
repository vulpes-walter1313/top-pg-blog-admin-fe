import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "../lib/queries.ts";
import type { PostType } from "../../types.ts";
import he from "he";
import { z } from "zod";

const postsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  publishedstatus: z
    .enum(["all", "published", "unpublished"])
    .optional()
    .catch("all"),
});
// type PostsSearch = z.infer<typeof postsSearchSchema>

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
  validateSearch: (search) => postsSearchSchema.parse(search),
});

function PostsPage() {
  const search = Route.useSearch();
  const postQuery = useQuery({
    queryKey: ["posts", search.publishedstatus ?? "all", search.page ?? 1],
    queryFn: async () => {
      const data = await getPosts(
        search.page ?? 1,
        search.publishedstatus ?? "all",
      );
      return data;
    },
  });
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950">
      <h1 className="pb-10 text-center text-slate-950">All Posts</h1>
      <div className="mx-auto flex w-full max-w-4xl gap-16">
        <aside className="flex w-full max-w-48 flex-col items-start gap-4 self-start rounded-lg border border-slate-300 bg-white p-4">
          <h3 className="text-slate-800">Filters</h3>
          <ul className="list-none">
            <li>
              <Link
                to="/posts"
                search={{ publishedstatus: "all" }}
                className={`${search.publishedstatus === "all" ? "font-semibold" : ""}`}
              >
                All
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                search={{ publishedstatus: "published" }}
                className={`${search.publishedstatus === "published" ? "font-semibold" : ""}`}
              >
                Published
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                search={{ publishedstatus: "unpublished" }}
                className={`${search.publishedstatus === "unpublished" ? "font-semibold" : ""}`}
              >
                Unpublished
              </Link>
            </li>
          </ul>
          <Link
            className="rounded-lg bg-indigo-700 px-6 py-2 font-sans text-lg font-semibold text-white"
            to="/posts/create"
          >
            Create Post
          </Link>
        </aside>
        <main className="flex flex-col gap-4">
          {postQuery.isLoading && (
            <p className="text-mobh5 lg:text-deskh5">Loading...</p>
          )}
          {postQuery.data &&
            postQuery.data.posts &&
            postQuery.data.posts.map((post: PostType) => (
              <article className="flex flex-col items-start gap-6 rounded-lg border border-slate-300 bg-white px-4 py-6">
                <div>
                  <h2 className="pb-4">{he.decode(post.title)}</h2>
                  <p className="pb-2">
                    {he.decode(post.content).split(" ").slice(0, 20).join(" ")}
                    ...
                  </p>
                  <p className="text-mobsmp text-slate-600 lg:text-desksmp">
                    {post._count.comments} comments
                  </p>
                  {post.published === true ? (
                    <p className="mt-2 w-min rounded-lg bg-green-300 px-2 py-1 text-mobxsp text-green-800 lg:text-deskxsp">
                      Published
                    </p>
                  ) : (
                    <p className="mt-2 w-max rounded-lg bg-amber-300 px-2 py-1 text-mobxsp text-amber-800 lg:text-deskxsp">
                      Draft Mode
                    </p>
                  )}
                </div>
                <Link
                  className="rounded-lg border-2 border-indigo-700 px-6 py-2 font-sans font-semibold text-indigo-700"
                  to="/posts/$postSlug"
                  params={{ postSlug: post.slug }}
                >
                  View
                </Link>
              </article>
            ))}
        </main>
      </div>
    </div>
  );
}
