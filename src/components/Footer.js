import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="bg-light fixed-bottom w-100"
      style={{
        paddingTop: "25px",
        paddingBottom: "35px",
      }}
    >
      <Container>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column">
            <p>Main pages:</p>
            <Link
              className="text-secondary"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-secondary"
              style={{ textDecoration: "none" }}
              to="/works"
            >
              Browse
            </Link>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column">
            <p>About our website:</p>
            <Link
              className="text-secondary"
              style={{ textDecoration: "none" }}
              to="/about/FAQ"
            >
              FAQ
            </Link>
            <Link
              className="text-secondary"
              style={{ textDecoration: "none" }}
              to="/about/privacy"
            >
              Privacy Policy
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;