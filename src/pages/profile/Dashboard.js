import { useEffect, useState } from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import { getRequest } from "../../utilities/requests";

const Dashboard = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const [user, setUser] = useState({});

  const [works, setWorks] = useState([]);

  const getWorks = async () => {
    const response = await getRequest(
      `works/authors/${location.pathname.split("/")[2]}?limit=5`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setWorks(response.works);
  };

  const getUser = async () => {
    const response = await getRequest(
      `users/logins/${location.pathname.split("/")[2]}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setUser(response.user);
  };

  useEffect(() => {
    getUser();
    getWorks();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      {user ? (
        <Card>
          <Card.Body>
            <Card.Title className="d-flex align-items-center gap-1">
              <div>{user.login}</div>
              {user.role === "ADMIN" ? (
                <Badge className="bg-admin-profile-bagde">ADMIN</Badge>
              ) : null}
            </Card.Title>
            <Card.Subtitle className="mb-3">
              Joined:{" "}
              {user.createdAt ? user.createdAt.split("T")[0] : null}
            </Card.Subtitle>
            {user.bios ? (
              <Card.Text as={Row} className="d-flex flex-row">
                <Col xs={2} lg={1} >Bios:</Col>
                <Col xs={10} lg={11}>{user.bios}</Col>
              </Card.Text>
            ) : null}
          </Card.Body>
        </Card>
      ) : null}
      {works.map((work, i) => (
        <WorkCard key={i} work={work} />
      ))}
    </div>
  );
};

export default Dashboard;
