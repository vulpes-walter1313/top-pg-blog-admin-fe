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
