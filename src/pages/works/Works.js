import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WorkCard from "../../components/WorkCard";
import { getRequest } from "../../utilities/requests";

const Works = ({
  sorting = {
    authorId: null,
    seriesId: null,
    collectionId: null,
    tagId: null,
    fandomId: null,
    warningId: null,
    language: null,
  },
}) => {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));
  const location = useLocation();
  const navigate = useNavigate();

  const [limit, setLimit] = useState(20);
  const [works, setWorks] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const params = location.search;
  const paramsArr = location.search.slice(1).split("&");
  let options = {};
  paramsArr.forEach((param) => {
    options[param.split("=")[0]] = param.split("=")[1];
  });

  const getWorks = async () => {
    const response = await getRequest(`works${params}`);
    if (!response.success) {
      return alert(response.message);
    }
    setWorks(response.works);
    setPageCount(response.pageCount);
  };

  const handlePagination = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.text);
    console.log(e.target.value);
    navigate(`./?limit=${options.limit}&page=${e.target.text}`);
  };

  useEffect(() => {
    getWorks();
  }, [location]);

  return (
    <Container className="py-3">
      <Row>
        <Col xs={12} md={3}>
          Sorting
        </Col>
        <Col xs={12} md={9}>
          <Row className="flex-column gap-3">
            {works.map((work, i) => (
              <Col key={i}>
                <WorkCard key={i} work={work} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Pagination className="py-3 d-flex justify-content-center">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p, i) =>
          p == options.page ? (
            <Pagination.Item active key={i}>
              {p}
            </Pagination.Item>
          ) : (
            <Pagination.Item value={p} key={i} onClick={handlePagination}>
              {p}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );
};

export default Works;
