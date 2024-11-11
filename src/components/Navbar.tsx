import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getAuthStatus } from "../lib/queries";

export default function Navbar() {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery({
    queryFn: getAuthStatus,
    queryKey: ["user"],
  });
  const logout = () => {
    localStorage.removeItem("auth_token");
    queryClient.invalidateQueries(["user"]);
  };

  return (
    <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
      <p className="text-2xl font-semibold">Blog Admin</p>
      {isSuccess && data.user && (
        <div className="flex items-center gap-6">
          <p className="text-lg font-medium text-slate-700">
            {data.user.firstName}
          </p>
          <Link href="/posts" className="text-lg text-slate-700">
            Posts
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            className="rounded-lg border-2 border-indigo-700 px-6 py-2 text-lg font-medium text-indigo-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
