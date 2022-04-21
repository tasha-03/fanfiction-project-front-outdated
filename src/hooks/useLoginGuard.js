import { useEffect } from "react";
import { useNavigate } from "react-router";
import useToken from "./useToken";

const useLoginGuard = ({ loggedIn, path }) => {
  const navigate = useNavigate();
  const { isLoggedIn: currentLoggedIn } = useToken();

  useEffect(() => {
    if (loggedIn === currentLoggedIn) {
      navigate(path);
    }
  });
};

export default useLoginGuard;
