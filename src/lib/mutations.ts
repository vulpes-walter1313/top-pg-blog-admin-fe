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
  return fetch(`http://localhost:3000/posts`, fetchOptions);
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
  return fetch(`http://localhost:3000/posts/${postSlug}`, fetchOptions);
};
