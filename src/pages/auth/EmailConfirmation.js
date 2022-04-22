import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginGuard from "../../hooks/useLoginGuard";
import { getRequest, postRequest } from "../../utilities/requests";

const { Row, Col, Form, Button, Container } = require("react-bootstrap");

const EmailConfirmation = () => {
  const navigate = useNavigate();
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

    navigate("/");
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>
                Enter confirmation code we have sent to your E-mail:
              </Form.Label>
              <Form.Control
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </Form.Group>
            <Button type="confirm" onClick={handleEmailConfirmation}>
              Confirm
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailConfirmation;
