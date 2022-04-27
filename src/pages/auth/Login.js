import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLoginGuard from "../../hooks/useLoginGuard";
import { getRequest, postRequest } from "../../utilities/requests";
import { login as authLogin } from "../../features/authSlice";

const LogIn = () => {
  document.title = "Log In — Fanfiction-Project";
  const dispatch = useDispatch();
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [mainHelpShow, setMainHelpShow] = useState(false);
  const [mainHelpText, setMainHelpText] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await postRequest("users/login", { login, password });

    if (!response.success) {
      setMainHelpShow(true);
      setMainHelpText(response.message + ".");
      setPassword("");
      return;
    }
    localStorage.setItem("token", response.token);
    const res = await getRequest(
      `users/myself?tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    );
    dispatch(
      authLogin({
        user: res.user,
        token: localStorage.getItem("token"),
      })
    );
    navigate("/");
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form>
            <Form.Text
              id="mainHelpBlock"
              muted
              style={{ display: mainHelpShow ? "initial" : "none" }}
            >
              {mainHelpText}
            </Form.Text>
            <Form.Group className="mb-4">
              <Form.Label>Login</Form.Label>
              <Form.Control
                required
				name="login"
                placeholder="Login"
                autoComplete="on"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
				name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button name="loginSubmit" type="submit" onClick={handleLogin}>
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
