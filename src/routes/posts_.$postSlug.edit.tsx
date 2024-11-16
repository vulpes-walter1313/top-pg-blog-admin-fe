import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getPost } from "../lib/queries";
import { useEffect, useState } from "react";
import he from "he";
import { updatePost } from "../lib/mutations";
import slugify from "slugify";

export const Route = createFileRoute("/posts_/$postSlug/edit")({
  component: PostEditPage,
});

type EditPostInputs = {
  title: string;
  content: string;
  slug: string;
  published: boolean;
};

function PostEditPage() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState<undefined | string>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<EditPostInputs>();

  const { data: postData, status } = useQuery({
    queryKey: ["post", params.postSlug],
    queryFn: async () => {
      const data = await getPost(params.postSlug);
      return data;
    },
  });

  useEffect(() => {
    // this is not working as expected
    // slug is not found, check api for the return value.
    console.log("useEffect Ran");
    if (status === "success" && postData != undefined) {
      setValue("title", he.decode(postData.post.title));
      setValue("content", he.decode(postData.post.content));
      setValue("slug", postData.post.slug);
      setValue("published", postData.post.published === true ? true : false);
    }
  }, [status]);

  const updatePostMuta = useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      setUpdateError(undefined);
      navigate({
        to: "/posts/$postSlug",
        params: { postSlug: variables.slug },
      });
    },
    onError: (err) => {
      console.log("err type", typeof err);
      setUpdateError("Some error occured in updating post.");
    },
  });

  const formOnSubmit: SubmitHandler<EditPostInputs> = (data) => {
    const { title, content, published, slug } = data;
    console.log(data);
    updatePostMuta.mutate({
      postSlug: params.postSlug,
      title,
      content,
      published,
      slug,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950">
      <div className="mx-auto flex max-w-5xl gap-14">
        <aside className="flex w-full max-w-48 justify-center gap-4 self-start rounded-lg border border-slate-300 bg-white p-4 shadow-md">
          <Link
            to="/posts/$postSlug"
            params={{ postSlug: params.postSlug }}
            className="rounded-lg bg-red-600 px-6 py-2 text-lg font-semibold text-white"
          >
            Cancel
          </Link>
        </aside>
        <main className="w-full rounded-lg border border-slate-300 bg-white px-4 py-6 shadow-md">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(formOnSubmit)}
          >
            {updateError != undefined && (
              <p className="rounded-lg bg-red-100 p-2 text-mobsmp text-red-800 lg:text-desksmp">
                {updateError}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium text-slate-800">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
                placeholder="Your title goes here"
                {...register("title", {
                  minLength: {
                    value: 1,
                    message: "Title must not be empty",
                  },
                  maxLength: {
                    value: 256,
                    message: "Title can't be longer than 256 characters",
                  },
                })}
              />
              {errors && errors.title && (
                <p className="rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-red-800">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="font-medium text-slate-800">
                Content
              </label>
              <textarea
                id="content"
                className="min-h-48 rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
                placeholder="Your content goes here"
                {...register("content", {
                  minLength: { value: 1, message: "Content can not be empty" },
                  maxLength: {
                    value: 4900,
                    message: "Content must not be longer than 4900 characters",
                  },
                })}
              ></textarea>
              {errors && errors.content && (
                <p className="rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-red-800">
                  {errors.content.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="font-medium text-slate-800">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
                placeholder="your-slug-goes-here"
                {...register("slug", {
                  minLength: {
                    value: 3,
                    message: "The slug must be 3 characters or longer",
                  },
                  maxLength: {
                    value: 72,
                    message: "Slug must be less than 73 characters",
                  },
                })}
              />
              {errors && errors.slug && (
                <p className="rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-red-800">
                  {errors.slug.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  const title = getValues("title");
                  setValue("slug", slugify(title, { lower: true }));
                }}
                className="mt-2 self-start rounded-lg border-2 border-indigo-700 px-6 py-2 text-mobsmp font-semibold text-indigo-700 lg:text-desksmp lg:font-semibold"
              >
                Slugify Title
              </button>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="published" className="font-medium text-slate-800">
                Is Published
              </label>
              <input
                type="checkbox"
                id="published"
                className="h-4 w-4 rounded-lg border border-slate-300 text-slate-700"
                {...register("published")}
              />
            </div>
            <button
              type="submit"
              className="self-start rounded-lg bg-slate-800 px-6 py-2 text-lg font-semibold text-slate-50"
            >
              Save
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
