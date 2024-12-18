import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/mutations";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type LoginInputs = {
  email: string;
  password: string;
};
function HomePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const loginMuta = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setLoginError(undefined);
      queryClient.invalidateQueries(["user"]);
      navigate({ to: "/posts" });
    },
    onError: (error) => {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else if (typeof error === "string") {
        setLoginError(error);
      } else {
        setLoginError("Error trying to log in");
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    loginMuta.mutate({ email: data.email, password: data.password });
  };
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center gap-6 bg-slate-50 pt-14 text-slate-900 lg:pt-20">
        <h1 className="text-mobh1 lg:text-deskh1">Blog Admin Portal</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-xs flex-col gap-6 rounded-lg border border-slate-300 bg-white p-6 shadow-md"
        >
          {loginError && (
            <p className="rounded-md bg-red-100 p-2 text-red-800">
              {loginError}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-slate-800"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              className="rounded-lg border border-slate-300 px-4 py-2 text-mobsmp text-slate-700 lg:text-desksmp"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-slate-800"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              className="rounded-lg border border-slate-300 px-4 py-2 text-mobsmp text-slate-700 lg:text-desksmp"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-indigo-700 px-6 py-2 text-mobsmp font-semibold text-slate-50 shadow-lg lg:text-desksmp lg:font-semibold"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
