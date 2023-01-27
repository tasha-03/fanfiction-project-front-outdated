import { useEffect, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TagCard from "../../components/TagCard";
import UserCard from "../../components/UserCard";
import { postRequest } from "../../utilities/requests";

const Tags = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const currentUser = useSelector((state) => state.auth.user);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.search.slice(1).split("&");
  var options = {};
  params.forEach((param) => {
    options[param.split("=")[0]] = param.split("=")[1];
  });
  const getTags = async () => {
    const response = await postRequest(`tags/search?limit=${limit}`, {
      name: options.name || "",
      category: options.category || "all",
    });
    if (!response.success) {
      return alert(response.message);
    }
    setTags(response.tags);
  };

  useEffect(() => {
    getTags();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (limit < 5) setLimit(5);
    if (limit > 100) setLimit(100);
    navigate(`.?name=${name}&category=${category}&limit=${limit}`);
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
        <Form.Group className="d-flex justify-content-center row-xs flex-sm-row flex-column">
          <Form.Label className="my-auto mb-sm-2 col-md-5">
            Category:
          </Form.Label>
          <Form.Select
            className="col-sm-6"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="character">Character</option>
            <option value="relationship">Relationship</option>
            <option value="other">Other</option>
          </Form.Select>
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
            Add tag
          </Button>
        ) : null}
      </Form>
      <ListGroup>
        {tags
          ? tags.map((tag, i) => (
              <TagCard key={i} tid={tag.id} tname={tag.name} />
            ))
          : null}
      </ListGroup>
    </Container>
  );
};

export default Tags;
