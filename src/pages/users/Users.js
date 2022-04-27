import { useEffect, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard";
import { postRequest } from "../../utilities/requests";

const Users = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const [users, setUsers] = useState([]);
  const [login, setLogin] = useState("");
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.search.slice(1).split("&");
  var options = {};
  params.forEach((param) => {
    options[param.split("=")[0]] = param.split("=")[1];
  });
  const getUsers = async () => {
    setUsers(
      (
        await postRequest(`users?limit=${limit}`, {
          login: options.login,
        })
      ).users
    );
  };

  useEffect(() => {
    getUsers();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (limit < 5) setLimit(5);
    if (limit > 100) setLimit(100);
    navigate(`.?login=${login}&limit=${limit}`);
  };

  return (
    <Container className="py-3">
      <Form className="d-flex gap-md-5 gap-2 mb-4 flex-md-row flex-column justify-content-center">
        <Form.Group className="d-flex justify-content-center row-xs flex-sm-row flex-column">
          <Form.Label className="my-auto mb-sm-2 col-sm-5">Search with login:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
      </Form>
      <ListGroup>
        {users
          ? users.map((user, i) => <UserCard key={i} login={user.login} />)
          : null}
      </ListGroup>
    </Container>
  );
};

export default Users;
