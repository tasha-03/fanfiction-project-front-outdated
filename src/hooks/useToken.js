const useToken = () => {
  const token = localStorage.getItem("token") || null;
  const isLoggedIn = Boolean(token);
  return { token, isLoggedIn };
};

export default useToken;
