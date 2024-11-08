import { createFileRoute } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type LoginInputs = {
  email: string;
  password: string;
};
function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center gap-6 bg-slate-50 pt-14 text-slate-900 lg:pt-20">
        <h1 className="text-mobh1 lg:text-deskh1">Blog Admin Portal</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-xs flex-col gap-6 rounded-lg border border-slate-300 bg-white p-6 shadow-md"
        >
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
