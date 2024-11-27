import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getPost, getPostComments } from "../lib/queries";
import he from "he";
import { DateTime } from "luxon";
import { useState } from "react";
import { deleteComment, deletePost } from "../lib/mutations";
import DeletePostModal from "../components/DeletePostModal";
import AuthCheck from "../components/AuthCheck";

export const Route = createFileRoute("/posts/$postSlug")({
  component: PostPage,
});
type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    firstName: string;
    lastName: string;
  };
};
function PostPage() {
  const params = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showDelConfirm, setShowDelConfirm] = useState(false);

  const postQuery = useQuery({
    queryKey: ["post", params.postSlug],
    queryFn: async () => {
      const data = await getPost(params.postSlug);
      return data;
    },
  });

  const [commentsPage, setCommentsPage] = useState(1);
  const commentsQuery = useQuery({
    queryKey: ["comments", params.postSlug, commentsPage],
    queryFn: async () => {
      const data = await getPostComments(params.postSlug, commentsPage);
      return data;
    },
  });

  const deletePostMuta = useMutation({
    mutationFn: async () => deletePost(params.postSlug),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate({ to: "/posts" });
    },
  });

  const deleteCommentMuta = useMutation({
    mutationFn: ({
      postSlug,
      commentId,
    }: {
      postSlug: string;
      commentId: number;
    }) => {
      return deleteComment(postSlug, commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", params.postSlug]);
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-950">
      <AuthCheck>
        <div className="mx-auto flex max-w-5xl gap-14 px-4 py-16">
          <aside className="flex gap-4 self-start rounded-lg border border-slate-300 bg-white p-4">
            <Link
              className="rounded-lg border-2 border-slate-800 px-6 py-2 font-semibold text-slate-800"
              to="/posts/$postSlug/edit"
              params={{ postSlug: params.postSlug }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="rounded-lg border-2 border-red-600 bg-red-600 px-6 py-2 font-semibold text-white"
              onClick={() => setShowDelConfirm(true)}
            >
              Delete
            </button>
          </aside>
          <main className="flex flex-col gap-8">
            <div className="rounded-lg border border-slate-300 bg-white p-4">
              {/* Post data block */}
              {postQuery.isError && (
                <p className="bg-red-100 p-4 text-red-800">
                  Error occured in fetching post
                </p>
              )}
              {postQuery.data && postQuery.data.post && (
                <>
                  <h1 className="mb-2">{postQuery.data.post.title}</h1>
                  <div className="mb-4">
                    <p className="text-mobsmp text-slate-700 lg:text-desksmp">
                      Written by {postQuery.data.post.author.firstName}{" "}
                      {postQuery.data.post.author.lastName}
                    </p>
                    <p className="text-mobsmp text-slate-700 lg:text-desksmp">
                      Created on{" "}
                      {DateTime.fromISO(
                        postQuery.data.post.createdAt,
                      ).toLocaleString(DateTime.DATE_FULL)}
                    </p>
                    <p className="text-mobsmp text-slate-700 lg:text-desksmp">
                      Last updated on{" "}
                      {DateTime.fromISO(
                        postQuery.data.post.updatedAt,
                      ).toLocaleString(DateTime.DATE_FULL)}
                    </p>
                  </div>
                  <p className="text-slate-800">
                    {he.decode(postQuery.data.post.content)}
                  </p>
                </>
              )}
            </div>
            {/* Comments Block */}
            <div className="rounded-lg border border-slate-300 bg-white px-4 py-6">
              {commentsQuery.data &&
                commentsQuery.data.totalComments != undefined && (
                  <h2 className="mb-8">
                    {commentsQuery.data.totalComments} Comments
                  </h2>
                )}
              <div className="flex flex-col gap-4">
                {commentsQuery.data &&
                  commentsQuery.data.comments &&
                  commentsQuery.data.comments.map((comment: CommentType) => {
                    return (
                      <div
                        className="border-l-4 border-indigo-600 p-2"
                        key={comment.id}
                      >
                        <p className="text-mobsmp text-slate-900 lg:text-desksmp">
                          {comment.author.firstName} {comment.author.lastName}
                        </p>
                        <div className="mb-2 flex gap-4 text-slate-600">
                          <p className="text-mobxsp lg:text-deskxsp">
                            Created on{" "}
                            {DateTime.fromISO(comment.createdAt).toLocaleString(
                              DateTime.DATETIME_MED,
                            )}
                          </p>
                          <p className="text-mobxsp lg:text-deskxsp">
                            Last updated on{" "}
                            {DateTime.fromISO(comment.updatedAt).toLocaleString(
                              DateTime.DATETIME_MED,
                            )}
                          </p>
                        </div>
                        <p className="text-mobp text-slate-800 lg:text-deskp">
                          {he.decode(comment.content)}
                        </p>
                        <button
                          type="button"
                          className="text-mobsmp text-red-700 lg:text-desksmp"
                          onClick={() =>
                            deleteCommentMuta.mutate({
                              postSlug: params.postSlug,
                              commentId: comment.id,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </div>
              {commentsQuery.data &&
                commentsQuery.data.totalPages != undefined &&
                commentsQuery.data.totalComments > 0 && (
                  <div className="mt-8 flex gap-4">
                    {Array.from({ length: commentsQuery.data.totalPages }).map(
                      (_, idx) => {
                        return (
                          <button
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm"
                            onClick={() => setCommentsPage(idx + 1)}
                            key={idx}
                          >
                            {idx + 1}
                          </button>
                        );
                      },
                    )}
                  </div>
                )}
            </div>
          </main>
        </div>
        {postQuery.data && postQuery.data.post && (
          <DeletePostModal
            show={showDelConfirm}
            postTitle={postQuery.data.post.title}
            setShow={setShowDelConfirm}
            deletePostFunc={deletePostMuta.mutate}
          />
        )}
      </AuthCheck>
    </div>
  );
}
