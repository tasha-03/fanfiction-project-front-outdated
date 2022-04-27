import { Col, Row, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";

const DashboardPage = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const login = location.pathname.split("/")[2];

  return (
    <Container className="py-3">
      <Row>
        <Col xs={3}>
          <Nav className="flex-column">
            <Nav.Item>Dashboard</Nav.Item>
            <Nav.Item>
              {login === currentUser.login ? "My " : null}Works
            </Nav.Item>
            {login === currentUser.login ? (
              <Nav.Item>My Drafts</Nav.Item>
            ) : null}
            <Nav.Item>
              {login === currentUser.login ? "My " : null}Series
            </Nav.Item>
            <Nav.Item>
              {login === currentUser.login ? "My " : null}Collections
            </Nav.Item>
            {login === currentUser.login ? (
              <Nav.Item>Preferences</Nav.Item>
            ) : null}
          </Nav>
        </Col>
        <Col>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="works">
              <Route index />
              <Route path="drafts" />
            </Route>
            <Route path="history" />
            <Route path="collections" />
            <Route path="series" />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
