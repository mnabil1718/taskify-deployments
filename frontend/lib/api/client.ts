const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && token !== "undefined" && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Debug logging
  //   console.log("Requesting:", `${API_URL}${endpoint}`);
  //   console.log("Headers:", headers);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
      // We can stop here or throw to prevent further execution in caller
      // throwing is safer to stop promise chains
      throw new Error("Session expired. Redirecting to login...");
    }
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
