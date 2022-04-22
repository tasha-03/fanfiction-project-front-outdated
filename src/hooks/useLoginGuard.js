import { useEffect } from "react";
import { useNavigate } from "react-router";
import useToken from "./useToken";
import { useSelector } from "react-redux";

const useLoginGuard = ({ loggedIn, path }) => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    if (loggedIn === isLoggedIn) {
      navigate(path);
    }
  });
};

export default useLoginGuard;
