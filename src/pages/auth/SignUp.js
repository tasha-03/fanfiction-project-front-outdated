import { useState } from "react";
import useLoginGuard from "../../hooks/useLoginGuard";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../utilities/requests";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../features/authSlice";

const SignUp = () => {
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [loginHelpShow, setLoginHelpShow] = useState(false);
  const [loginHelpText, setLoginHelpText] = useState("");
  const [emailHelpShow, setEmailHelpShow] = useState(false);
  const [emailHelpText, setEmailHelpText] = useState("");
  const [passHelpShow, setPassHelpShow] = useState(false);
  const [passHelpText, setPassHelpText] = useState("");

  const handleSignUp = async (e) => {
    var loginValid = true;
    var emailValid = true;
    var passwordMatch = true;
    e.preventDefault();
    if (!login.match(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.\-_]{7,19}$/)) {
      setLoginHelpShow(true);
      setLoginHelpText(
        "Your login must be 8-20 characters long, start with a letter, end with a letter or number, contain letters, numbers, hyphen or underscore, and must not contain spaces, special characters, or emoji."
      );
      loginValid = false;
    } else if (!login) {
      setLoginHelpShow(true);
      setLoginHelpText(
        "You must provide login, so we can be able to recognize you later."
      );
      loginValid = false;
    } else {
      setLoginHelpShow(false);
      loginValid = true;
    }
    if (
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      setEmailHelpShow(true);
      setEmailHelpText("Please provide proper email address.");
      emailValid = false;
    } else {
      setEmailHelpShow(false);
      emailValid = true;
    }
    if (password.length < 8) {
      setPassHelpText("The password must contain at least 8 symbols.");
      passwordMatch = false;
    } else if (!(password === passRepeat)) {
      setPassword("");
      setPassRepeat("");
      setPassHelpShow(true);
      setPassHelpText("Passwords do not match.");
      passwordMatch = false;
    } else {
      setPassHelpShow(false);
      passwordMatch = true;
    }
    if (!loginValid || !emailValid || !passwordMatch) {
      return;
    }
    const response = await postRequest("users/signup", {
      login,
      email,
      password,
    });
    if (!response.success) {
      alert(response.message);
      setLogin("");
      setEmail("");
      setPassword("");
      setPassRepeat("");
      return;
    } else {
      localStorage.setItem("token", response.token);
      const res = await getRequest("users/myself");
      dispatch(
        authLogin({
          user: res.user,
          token: localStorage.getItem("token"),
        })
      );
      const codeResponse = getRequest("users/email/confirm/request");
      if (!codeResponse.success) {
        alert(codeResponse.message);
      }
      navigate("/confirm-email");
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Login</Form.Label>
              <Form.Control
                required
                placeholder="Login"
                value={login}
                minLength={8}
                maxLength={20}
                pattern="^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{7,19}$"
                onChange={(e) => setLogin(e.target.value)}
              />
              <Form.Text
                id="loginHelpBlock"
                muted
                style={{ display: loginHelpShow ? "initial" : "none" }}
              >
                {loginHelpText}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="example@example.example"
                value={email}
                pattern="[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text
                id="emailHelpBlock"
                muted
                style={{
                  display: emailHelpShow ? "initial" : "none",
                }}
              >
                {emailHelpText}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                minLength={8}
                maxLength={64}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repeat Password"
                value={passRepeat}
                minLength={8}
                maxLength={64}
                onChange={(e) => setPassRepeat(e.target.value)}
              />
              <Form.Text
                id="passwordHelpBlock"
                muted
                style={{
                  display: passHelpShow ? "initial" : "none",
                }}
              >
                {passHelpText}
              </Form.Text>
            </Form.Group>
            <Button type="submit" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
