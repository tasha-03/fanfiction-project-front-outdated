import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Works = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  return <Container className="py-3">Works</Container>;
};

export default Works;
