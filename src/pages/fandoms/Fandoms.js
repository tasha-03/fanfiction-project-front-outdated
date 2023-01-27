import { useEffect, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FandomCard from "../../components/FandomCard";
import { postRequest } from "../../utilities/requests";

const Fandoms = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const currentUser = useSelector((state) => state.auth.user);
  const [fandoms, setFandoms] = useState([]);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.search.slice(1).split("&");
  var options = {};
  params.forEach((param) => {
    options[param.split("=")[0]] = param.split("=")[1];
  });
  const getFandoms = async () => {
    const response = await postRequest(`fandoms/search?limit=${limit}`, {
      name: options.name || "",
    });
    if (!response.success) {
      return alert(response.message);
    }
    setFandoms(response.fandoms);
  };

  useEffect(() => {
    getFandoms();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (limit < 5) setLimit(5);
    if (limit > 100) setLimit(100);
    navigate(`.?name=${name}&limit=${limit}`);
  };

  return (
    <Container className="py-3">
      <Form className="d-flex gap-md-5 gap-2 mb-4 flex-md-row flex-column justify-content-center">
        <Form.Group className="d-flex justify-content-center row-xs flex-sm-row flex-column">
          <Form.Label className="my-auto mb-sm-2 col-md-5">
            Search with name:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        {currentUser && currentUser.role === "ADMIN" ? (
          <Button type="submit" as={Link} to="../add">
            Add fandom
          </Button>
        ) : null}
      </Form>
      <ListGroup>
        {fandoms
          ? fandoms.map((f, i) => (
              <FandomCard key={i} fid={f.id} fname={f.name} />
            ))
          : null}
      </ListGroup>
    </Container>
  );
};

export default Fandoms;
