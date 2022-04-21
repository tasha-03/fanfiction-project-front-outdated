import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getRequest } from "../utilities/requests";
import useToken from "../hooks/useToken";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoggedIn } = useToken();

  useEffect(() => {
    if (isLoggedIn) {
      const getCurrentUser = async () => {
        const res = await getRequest("users/myself");
        setCurrentUser(res.user);
      };
      getCurrentUser();
    } else {
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  const home = !isLoggedIn ? (
    <Container fluid>
      <Row>
        <Col sm={12} md={12}>
          Slider
        </Col>
        <Col sm={12} md={6}>
          What is Fanfiction-Project
        </Col>
        <Col sm={12} md={6}>
          More than 100,000 users and 75,000 works!
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row>
        <Col sm={12} md={6}>Browse your favourites:</Col>
        <Col sm={12} md={6}>
          <div>Post New Work</div>
          <div>News</div>
        </Col>
      </Row>
    </Container>
  );

  return home;
};

export default Home;
