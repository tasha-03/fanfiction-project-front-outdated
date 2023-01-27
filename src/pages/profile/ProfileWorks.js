import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import { getRequest } from "../../utilities/requests";

const ProfileWorks = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  const [works, setWorks] = useState([]);

  const getWorks = async () => {
    const response = await getRequest(
      `works/authors/${location.pathname.split("/")[2]}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setWorks(response.works);
  };

  useEffect(() => {
    getWorks();
  }, []);

  return works && works.length === 0 ? (
    <div className="text-center">
      No works here...
      <br /><br />
      ...yet
    </div>
  ) : (
    <div className="d-flex flex-column gap-3">
      {works.map((work, i) => (
        <WorkCard key={i} work={work} />
      ))}
    </div>
  );
};

export default ProfileWorks;
