import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="bg-light w-100 mt-auto"
      style={{
        paddingTop: "25px",
        paddingBottom: "35px",
      }}
    >
      <Container>
        <Row className="gap-3 gap-md-0">
          <Col xs={12} md={6} className="d-flex flex-column">
            <p>Main pages:</p>
            <Link
              className="nav-link"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Home
            </Link>
            <Link
              className="nav-link"
              style={{ textDecoration: "none" }}
              to="/works"
            >
              Browse
            </Link>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column">
            <p>About our website:</p>
            <Link
              className="nav-link"
              style={{ textDecoration: "none" }}
              to="/about/FAQ"
            >
              FAQ
            </Link>
            <Link
              className="nav-link"
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
