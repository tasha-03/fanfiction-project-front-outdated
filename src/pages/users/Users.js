import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Users = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  return <Container>Users</Container>;
};

export default Users;
