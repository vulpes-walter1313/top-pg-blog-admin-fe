import { getErrorMessageFromReq } from "./handleErrors";

type LoginPayload = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginPayload) => {
  const fetchOptions: RequestInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/login`,
    fetchOptions,
  );
  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message ?? "Error logging in");
  }
  const data = await res.json();
  localStorage.setItem("auth_token", data.token);
  return data;
};

type CreatePostPayload = {
  title: string;
  content: string;
  slug: string;
  published: boolean;
};
export const createPost = (data: CreatePostPayload) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  if (authToken) {
    fetchOptions.headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };
  } else {
    fetchOptions.headers = {
      "Content-Type": "application/json",
    };
  }
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, fetchOptions);
};

export const deletePost = (postSlug: string) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "DELETE",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }
  return fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postSlug}`,
    fetchOptions,
  );
};

export const deleteComment = (postSlug: string, commentId: number) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "DELETE",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }
  return fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postSlug}/comments/${commentId}`,
    fetchOptions,
  );
};

type UpdatePostPayload = {
  postSlug: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
};
export const updatePost = (data: UpdatePostPayload) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      slug: data.slug,
      published: data.published,
    }),
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
      "Content-Type": "application/json",
    };
  } else {
    fetchOptions.headers = {
      "Content-Type": "application/json",
    };
  }
  return fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${data.postSlug}`,
    fetchOptions,
  );
};
