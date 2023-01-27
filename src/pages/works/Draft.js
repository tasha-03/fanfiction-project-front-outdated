import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import WorkHeader from "../../components/WorkHeader";
import { getRequest } from "../../utilities/requests";

const Draft = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  console.log(location.search);

  const [work, setWork] = useState({});
  console.log(work.parts ? work.parts.length : "no work available");

  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const workText =
    work.parts && work.parts.length > 1 ? (
      work.parts.map((part, i) => (
        <>
          {part.title ? (
            <h5 className="text-center" key={i}>
              {part.title}
            </h5>
          ) : null}
          {part.note ? (
            <Row key={i}>
              <Col className="d-flex gap-3 align-items-center pb-3">
                <h6 className="m-0">Notes:</h6>
                <p className="m-0">{part.note}</p>
              </Col>
              <hr />
            </Row>
          ) : null}
          <hr />
          {work.parts && work.parts[0] && work.parts[0].text ? (
            <Row key={i}>
              <Col
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(work.parts[0].text),
                }}
              ></Col>
            </Row>
          ) : null}
        </>
      ))
    ) : (
      <>
        {work.parts && work.parts[0] && work.parts[0].description ? (
          <Row>
            <Col className="d-flex gap-3 align-items-center pb-3">
              <h6 className="m-0">Description:</h6>
              <p className="m-0">
                {work.parts ? work.parts[0].description : null}
              </p>
            </Col>
          </Row>
        ) : null}
        {work.parts && work.parts[0] && work.parts[0].note ? (
          <Row>
            <Col className="d-flex gap-3 align-items-center pb-3">
              <h6 className="m-0">Notes:</h6>
              <p className="m-0">{work.parts ? work.parts[0].note : null}</p>
            </Col>
          </Row>
        ) : null}
        <hr />
        {work.parts && work.parts[0] && work.parts[0].text ? (
          <Row>
            <Col
              dangerouslySetInnerHTML={{
                __html: decodeHtml(work.parts[0].text),
              }}
            ></Col>
          </Row>
        ) : null}
        ;
      </>
    );

  const getWork = async () => {
    console.log(location.pathname.split("/")[5]);
    const response = await getRequest(
      `works/myworks/${location.pathname.split("/")[5]}`
    );
    if (!response.success) {
      return alert(response.message);
    }
    setWork(response.work);
  };

  useEffect(() => {
    getWork();
  }, []);

  return (
    <Container className="py-3">
      <Row className="align-items-center gap-3">
        {work.author ? (
          isLoggedIn && currentUser.userId === work.author.id ? (
            <Col>
              <Row className="d-flex gap-3">
                <Button
                  className="col-xs-1 w-25"
                  variant="secondary"
                  size="sm"
                  as={Link}
                  to="./part"
                >
                  Add part
                </Button>
                <Button
                  className="col-xs-1 w-25"
                  variant="secondary"
                  size="sm"
                  as={Link}
                  to="edit"
                >
                  Edit work
                </Button>
              </Row>
            </Col>
          ) : null
        ) : null}
        <WorkHeader work={work} />
        <h4 className="text-center">{work.title}</h4>
        <h5 className="text-center">
          {work.author ? work.author.login : null}
        </h5>
        <hr />
        {workText}
      </Row>
    </Container>
  );
};

export default Draft;
