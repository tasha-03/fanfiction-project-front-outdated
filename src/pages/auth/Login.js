import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLoginGuard from "../../hooks/useLoginGuard";
import { postRequest } from "../../utilities/requests";

const LogIn = () => {
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await postRequest("users/login", { login, password });

    if (!response.success) {
      alert(response.message);
      setPassword("");
      return;
    }

    localStorage.setItem("token", response.token);
    navigate("/");
  };

  return (
    <Row className="justify-content-center">
      <Col sm={12} md={6}>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Login</Form.Label>
            <Form.Control
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" onClick={handleLogin}>
            Log In
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default LogIn;
