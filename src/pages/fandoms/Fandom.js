import { useEffect, useState } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import { getRequest } from "../../utilities/requests";

const Tag = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.search.slice(1).split("&");
  var options = {};
  params.forEach((param) => {
    options[param.split("=")[0]] = param.split("=")[1];
  });
  const getWorksByTagId = async () => {
    const response = await getRequest(
      `tags/works/${
        location.pathname.split("/")[2].split("_")[0]
      }?limit=${limit}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setWorks(response.works);
  };

  useEffect(() => {
    getWorksByTagId();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (limit < 5) setLimit(5);
    if (limit > 100) setLimit(100);
    navigate(`.?limit=${limit}`);
  };

  return (
    <Container className="py-3">
      <Form className="d-flex gap-md-5 gap-2 mb-4 flex-md-row flex-column justify-content-center">
        <Form.Group className="d-flex align-items-center gap-2 justify-content-center">
          <Form.Label className="my-auto">Show:</Form.Label>
          <Form.Control
            as="input"
            style={{ width: "5em" }}
            type="number"
            min={5}
            max={100}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit}>
          Search
        </Button>
      </Form>
      <Col xs={12} md={9}>
        <Row className="flex-column gap-3">
          {works.map((work, i) => (
            <Col key={i}>
              <WorkCard key={i} work={work} />
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
};

export default Tag;
