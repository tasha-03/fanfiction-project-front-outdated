import { Col, Row, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Draft from "../works/Draft";
import EditWork from "../works/EditWork";
import Dashboard from "./Dashboard";
import Preferences from "./Preferences";
import ProfileDrafts from "./ProfileDrafts";
import ProfileHistory from "./ProfileHistory";
import ProfileWorks from "./ProfileWorks";

const DashboardPage = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const login = location.pathname.split("/")[2];

  return (
    <Container className="py-3">
      <Row className="gap-3">
        <Col xs={12} md={2}>
          <Nav className="flex-row flex-md-column gap-3 gap-md-1">
            <Nav.Item>
              <Link to="./">Dashboard</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="./works">
                {login === currentUser.login ? "My " : null}
                Works
              </Link>
            </Nav.Item>
            {login === currentUser.login ? (
              <Nav.Item>
                <Link to="./works/drafts">My Drafts</Link>
              </Nav.Item>
            ) : null}
            <Nav.Item>
              <Link to="./series">
                {login === currentUser.login ? "My " : null}Series
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="./collections">
                {login === currentUser.login ? "My " : null}Collections
              </Link>
            </Nav.Item>
            {login === currentUser.login ? (
              <Nav.Item>
                <Link to="./history">History</Link>
              </Nav.Item>
            ) : null}
            {login === currentUser.login ? (
              <Nav.Item>
                <Link to="./preferences">Preferences</Link>
              </Nav.Item>
            ) : null}
          </Nav>
        </Col>
        <Col>
          <Routes>
            <Route path="/">
              <Route path="works">
                <Route index element={<ProfileWorks />} />
                <Route path="drafts">
                  <Route
                    index
                    element={
                      login !== currentUser.login ? (
                        <Navigate to="../.." />
                      ) : (
                        <ProfileDrafts />
                      )
                    }
                  />
                  <Route path=":workId">
                    <Route index element={<Draft />} />
                    <Route path="edit" element={<EditWork />} />
                  </Route>
                </Route>
              </Route>
              <Route path="history" element={<ProfileHistory />} />
              <Route path="collections" />
              <Route path="series" />
              <Route
                path="preferences"
                element={
                  login !== currentUser.login ? (
                    <Navigate to="../.." />
                  ) : (
                    <Preferences />
                  )
                }
              />

              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
