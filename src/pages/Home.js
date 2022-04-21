import { Container, Col, Row } from "react-bootstrap";

const Home = ({ isLoggedIn }) => {
  const home = isLoggedIn ? (
    <Container fluid>
      <Row>
        <Col sm={12} md={12}>
          true
        </Col>
        <Col sm={12} md={6}>
          true
        </Col>
        <Col sm={12} md={6}>
          true
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Container>false</Container>
    </Container>
  );
  return home;
};

export default Home;
