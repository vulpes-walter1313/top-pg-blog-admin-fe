import { getErrorMessageFromReq } from "./handleErrors";

export const getAuthStatus = async () => {
  const token = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (token) {
    fetchOptions.headers = {
      Authorization: token,
    };
  }
  const res = await fetch("http://localhost:3000/authcheck", fetchOptions);
  if (!res.ok) {
    throw new Error("Error is fetching auth status");
  }
  const data = await res.json();

  return data;
};

export const getPosts = async (
  page: number,
  publishedStatus: "all" | "published" | "unpublished",
) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }
  const res = await fetch(
    `http://localhost:3000/posts?limit=10&page=${page}&publishedstatus=${publishedStatus}`,
    fetchOptions,
  );
  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      getErrorMessageFromReq(data) || "Some error happened fetching posts",
    );
  }
  const data = await res.json();
  return data;
};