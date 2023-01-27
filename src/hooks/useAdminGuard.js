import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const useAdminGuard = ({role}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("../");
    }
  });
};

export default useAdminGuard;
