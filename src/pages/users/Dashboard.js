import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  return (
    <>
      Profile
    </>
  );
};

export default Dashboard;
