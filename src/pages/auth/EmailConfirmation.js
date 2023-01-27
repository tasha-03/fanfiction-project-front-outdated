import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginGuard from "../../hooks/useLoginGuard";
import { getRequest, postRequest } from "../../utilities/requests";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/authSlice";

const { Row, Col, Form, Button, Container } = require("react-bootstrap");

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autoLogin = async () => {
    const response = await getRequest(
      `users/myself?tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    );
    if (response.success) {
      dispatch(
        login({
          user: response.user,
          token: localStorage.getItem("token"),
        })
      );
    } else {
      dispatch(logout());
    }
  };

  const currentUser = useSelector((state) => state.auth.user);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleEmailConfirmation = async (e) => {
    e.preventDefault();
    // const requestResponse = await getRequest("users/email/confirm/request", { login, password });
    const response = await postRequest("/users/email/confirm", {
      confirmationCode,
    });

    if (!response.success) {
      alert(response.message);
      setConfirmationCode("");
      return;
    }
    autoLogin();
    navigate("/");
  };

  return currentUser.emailIsConfirmed ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6} className="text-center">
          Your E-mail has been already confirmed!
        </Col>
      </Row>
    </Container>
  ) : (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form className="d-flex flex-column gap-4">
            <Form.Group as={Row}>
              <Form.Label column sm={6}>
                Enter confirmation code we have sent to your E-mail:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 2, offset: 5 }}>
              <Button type="confirm" onClick={handleEmailConfirmation}>
                Confirm
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailConfirmation;
