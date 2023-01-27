import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLoginGuard from "../../hooks/useLoginGuard";
import { getRequest, postRequest } from "../../utilities/requests";
import { login as authLogin } from "../../features/authSlice";
import { vkSign } from "../../utilities/vkSign";

const LogIn = () => {
  document.title = "Log In — Fanfiction-Project";
  const dispatch = useDispatch();
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [mainHelpShow, setMainHelpShow] = useState(false);
  const [mainHelpText, setMainHelpText] = useState("");
  const [remember, setRemember] = useState(false);

  const checkLogin = () => {
    if (localStorage.getItem("remember")) {
      setLogin(localStorage.getItem("login"));
    }
  };

  const checkRemember = () => {
    if (localStorage.getItem("login")) {
      setRemember(localStorage.getItem("remember"));
    }
  };

  useEffect(() => {
    checkLogin();
    checkRemember();
  }, []);

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
    localStorage.setItem("remember", remember);
    localStorage.setItem("login", login);
    navigate("/");
  };

  const handleVkSign = async (e) => {
    e.preventDefault();
    const response = await vkSign();
    console.log(response);
    window.location.assign(response.url);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form className="d-flex flex-column gap-4">
            <Form.Text
              id="mainHelpBlock"
              muted
              style={{ display: mainHelpShow ? "initial" : "none" }}
            >
              {mainHelpText}
            </Form.Text>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Login
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  name="login"
                  placeholder="Login"
                  autoComplete="on"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check
                label="Remember login"
                defaultChecked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
            </Col>

            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                className="w-75"
                name="loginSubmit"
                type="submit"
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Col>
          </Form>
          <hr />
          <Form className="pt-3 d-flex flex-column align-items-center">
            <p>Log in with apps:</p>
            <Col>
              <Button onClick={handleVkSign}>Log in with Vk</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
