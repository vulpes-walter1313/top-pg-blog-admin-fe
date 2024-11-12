import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createPost } from "../lib/mutations";
import slugify from "slugify";

export const Route = createFileRoute("/posts/create")({
  component: CreatePostPage,
});

type FormInputs = {
  title: string;
  content: string;
  published: boolean;
  slug: string;
};
function CreatePostPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const title = watch("title");
  const createPostMut = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    createPostMut.mutate(data);
    navigate({ to: "/posts" });
  };
  return (
    <div className="flex min-h-screen flex-col items-center gap-12 bg-slate-50 px-4 py-16 font-sans text-slate-950">
      <h1>Create A Post</h1>
      <form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-slate-300 bg-white px-4 py-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="font-sans text-lg font-medium text-slate-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-mobp lg:text-deskp"
            {...register("title", {
              minLength: {
                value: 3,
                message: "title should be longer than 3",
              },
              maxLength: {
                value: 256,
                message: "Title should be shorter than 256",
              },
            })}
          />
          {errors && errors.title && (
            <p className="rounded-lg bg-red-100 p-3 text-red-800">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="content"
            className="font-sans text-lg font-medium text-slate-900"
          >
            Content
          </label>
          <textarea
            id="content"
            className="min-h-28 rounded-lg border border-slate-300 bg-white px-4 py-2 text-mobp lg:text-deskp"
            {...register("content", {
              minLength: {
                value: 3,
                message: "Should be longer than 3",
              },
              maxLength: {
                value: 4900,
                message: "Should be less than 4900 characters",
              },
            })}
          ></textarea>
          {errors && errors.content && (
            <p className="rounded-lg bg-red-100 p-3 text-red-800">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="slug"
            className="font-sans text-lg font-medium text-slate-900"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-mobp lg:text-deskp"
            {...register("slug", {
              minLength: {
                value: 3,
                message: "Should be longer than 3 characters",
              },
              maxLength: {
                value: 72,
                message: "Should be less than 72 characters",
              },
            })}
          />
          {errors && errors.slug && (
            <p className="rounded-lg bg-red-100 p-3 text-red-800">
              {errors.slug.message}
            </p>
          )}
          <button
            type="button"
            className="mt-2 self-start rounded-lg border-2 border-indigo-600 px-6 py-2 font-sans font-medium text-indigo-600"
            onClick={() => {
              setValue("slug", slugify(title, { lower: true }));
            }}
          >
            Slugify title
          </button>
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="published"
            className="font-sans text-lg font-medium text-slate-900"
          >
            is published?
          </label>
          <input
            type="checkbox"
            id="published"
            className="h-4 w-4 rounded-lg border border-slate-300 bg-white px-4 py-2"
            {...register("published")}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg border-2 border-slate-950 px-6 py-2 font-semibold"
          >
            Save
          </button>
          <Link
            to={"/posts"}
            className="rounded-lg border-2 border-red-600 bg-red-600 px-6 py-2 text-white"
          >
            Cancel
          </Link>
        </div>
        {createPostMut.isError && createPostMut.error instanceof Error && (
          <p>{createPostMut.error.message}</p>
        )}
      </form>
    </div>
  );
}
