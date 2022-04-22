import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Work = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  return (
    <Container className="py-3">
      <Card>
        <Card.Body>
          <Card.Title>Work Title</Card.Title>
          <Card.Subtitle>Author</Card.Subtitle>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Work;
