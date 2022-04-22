exports.postRequest = async (path, body) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token") || null;
  const isLoggedIn = Boolean(token);
  if (isLoggedIn) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`/api/v1/${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }
  return response;
};

exports.getRequest = async (path) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token") || null;
  const isLoggedIn = Boolean(token);
  if (isLoggedIn) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`/api/v1/${path}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }
  return response;
};
