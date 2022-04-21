const { Row, Col, Form, Button } = require("react-bootstrap");

const EmailConfirmation = () => {
  

  return (
    <Row className="justify-content-center">
      <Col sm={12} md={6}>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>
              Enter confirmation code we sent to your E-mail:
            </Form.Label>
            <Form.Control />
          </Form.Group>
          <Button type="confirm">Confirm</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EmailConfirmation;
