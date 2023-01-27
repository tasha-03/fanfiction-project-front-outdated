import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { vkGetToken } from "../../utilities/vkSign";
import { login } from "../../features/authSlice";
import { useEffect } from "react";
import { getRequest } from "../../utilities/requests";

const VkAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = async () => {
    const response = await vkGetToken(location.search);
    localStorage.setItem("token", response.token);
    const res = await getRequest(
      `users/myself?tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    );
    if (!res.success) {
      return alert(res.message);
    }
    dispatch(
      login({
        user: res.user,
        token: localStorage.getItem("token"),
      })
    );
  };

  useEffect(() => {
    auth();
    navigate("/");
  }, []);

  return <></>;
};

export default VkAuth;
