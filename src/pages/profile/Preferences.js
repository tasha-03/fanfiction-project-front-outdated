import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import { postRequest } from "../../utilities/requests";
import { logout } from "../../features/authSlice";

const Preferences = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [bios, setBios] = useState("");
  const [emailNotificationsOn, setEmailNotificationsOn] = useState(true);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (repeatPassword === password) {
      const response = await postRequest(
        `users/preferences/${currentUser.userId}`,
        { login, oldPassword, password, bios, emailNotificationsOn }
      );
      if (!response.success) {
        return alert(response.message);
      }
    }
    if (login || oldPassword) {
      dispatch(logout());
      navigate("/")
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form className="d-flex flex-column gap-4">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Login
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder={currentUser.login}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bios
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  value={bios}
                  onChange={(e) => setBios(e.target.value)}
                  placeholder="Write something about you"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check
                  type="checkbox"
                  label="Email notifications"
                  defaultChecked={true}
                  onChange={(e) => setEmailNotificationsOn(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Old password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                New password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Repeat new password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat new password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Preferences;
