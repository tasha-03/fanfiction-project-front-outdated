import {
  Container,
  Col,
  Row,
  Carousel,
  CarouselItem,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WorkCard from "../components/WorkCard";

const Home = () => {
  document.title = "Home — Fanfiction-Project";
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  const home = !isLoggedIn ? (
    <Container fluid className="py-3">
      <Row>
        <Col sm={12} md={12}>
          <Carousel variant="dark" interval={null}>
            <CarouselItem>
              <Container>
                <Row className="justify-content-center my-3">
                  <Col xs={11}>
                    <WorkCard workId={1} />
                  </Col>
                </Row>
              </Container>
            </CarouselItem>
            <CarouselItem>
              <Container>
                <Row className="justify-content-center my-3">
                  <Col xs={11}>
                    <WorkCard workId={2} />
                  </Col>
                </Row>
              </Container>
            </CarouselItem>
          </Carousel>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Header className="text-center">
              What is Fanfiction-Project
            </Card.Header>
            <Card.Body>Random text</Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Header className="text-center">
              More than 100,000 users and 75,000 works!
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col xs={8}>
                    <p>You can join us and:</p>
                    <ul>
                      <li>Post your own works;</li>
                      <li>Save your history;</li>
                      <li>Keep track of your favourite works</li>
                    </ul>
                  </Col>
                  <Col className="d-flex flex-column justify-content-center">
                    <Button variant="primary">Create account</Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid className="py-3">
      <Row className="gap-md-0 gap-3 mx-2">
        <Col sm={12} md={6}>
          <Card>
            <Card.Header>Browse your favourites:</Card.Header>
            <Card.Body className="px-0 m-0 row">
              <Card className="col-12 col-lg-6 p-0 rounded-0">
                <Card.Header>Fandoms</Card.Header>
                <Card.Body className="p-0">
                  <ListGroup className="rounded-0">
                    <ListGroup.Item>Star Wars</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="col-12 col-lg-6 p-0 m-0 rounded-0">
                <Card.Header>Tags</Card.Header>
                <Card.Body className="p-0">
                  <ListGroup className="rounded-0">
                    <ListGroup.Item>Star Wars</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="col-12 p-0 rounded-0">
                <Card.Header>Authors</Card.Header>
                <Card.Body className="p-0">
                  <ListGroup className="rounded-0">
                    <ListGroup.Item>Star Wars</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-column gap-3">
          <Card>
            <Card.Body className="d-flex flex-column align-items-stretch">
              <Button as={Link} to="/works/new" name="postNewWorkBtn">Post New Work</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>News</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return home;
};

export default Home;
