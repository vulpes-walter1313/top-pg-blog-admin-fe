import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../lib/queries";
import { Link } from "@tanstack/react-router";

type AuthCheckProps = {
  children: React.ReactNode;
};
function AuthCheck({ children }: AuthCheckProps) {
  const userAuthQuery = useQuery({
    queryFn: getAuthStatus,
    queryKey: ["user"],
  });
  return (
    <div>
      {userAuthQuery.data &&
      userAuthQuery.data.user != undefined &&
      userAuthQuery.data.user.isAdmin === true ? (
        <>{children}</>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-14">
          <h1 className="text-center text-mobh1 lg:text-deskh1">
            You are not authorized to see this page. Login as admin
          </h1>
          <Link
            to="/"
            className="rounded-lg bg-indigo-700 px-6 py-2 text-white"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthCheck;
