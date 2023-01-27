import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const WorkCard = ({ work, link = "/works" }) => {
  const header = {};
  if (work) {
    header.title = work.title;
    header.description = work.description;
    header.finished = work.finished;
    header.category = { id: work.category, name: null };
    header.language = work.language
      ? work.language[0].toUpperCase() + work.language.slice(1)
      : null;

    header.createdAt = work.createdAt ? work.createdAt.split("T")[0] : null;
    header.updatedAt = work.updatedAt ? work.updatedAt.split("T")[0] : null;

    header.visited = work.visited ? work.visited.split("T")[0] : null;

    header.partsCount = work.parts ? work.parts.length : null;

    header.warnings = work.warnings ? work.warnings : null;

    header.fandoms = work.fandoms ? work.fandoms : null;
    header.relationships = work.tags
      ? work.tags.filter((t) => t.category === "relationship")
      : null;
    header.characters = work.tags
      ? work.tags.filter((t) => t.category === "character")
      : null;
    header.otherTags = work.tags
      ? work.tags.filter((t) => t.category === "other")
      : null;
    switch (work.rating) {
      case "general":
        header.rating = "General Audience";
        break;
      case "teenage":
        header.rating = "Teenage Audience";
        break;
      case "mature":
        header.rating = "Mature Audience";
        break;
      case "explicit":
        header.rating = "Explicit Content";
        break;
      default:
        header.rating = "Not Rated";
    }

    switch (work.category) {
      case "gen":
        header.category.name = "Gen";
        break;
      case "f/m":
        header.category.name = "F/M";
        break;
      case "m/m":
        header.category.name = "M/M";
        break;
      case "f/f":
        header.category.name = "F/F";
        break;
      case "other":
        header.category.name = "Other";
        break;
      default:
        header.category.name = "Not Categorized";
    }
  }

  if (Boolean(work)) {
    return (
      <Card className="workCard">
        <Card.Header>
          <Badge
            className={
              "bg-secondary bg-rating-" +
              header.rating.replace(" ", "-").toLowerCase()
            }
          >
            {header.rating}
          </Badge>
          <Badge
            className={
              "bg-secondary bg-category-" +
              header.category.name.replace("/", "").toLowerCase()
            }
          >
            {header.category.name}
          </Badge>
          <Badge className={"bg-finished-" + String(header.finished)}>
            {header.finished ? "finished" : "in progress"}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={link + "/" + work.workId}>{header.title}</Link>
          </Card.Title>
          <Row>
            <Col xs={12} md={2}>
              Rating:
            </Col>
            <Col className="d-flex gap-2">
              <Link to={"/tags/" + header.rating}>{header.rating}</Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2}>
              Warnings:
            </Col>
            <Col className="d-flex gap-2">
              {header.warnings
                ? header.warnings.length !== 0
                  ? header.warnings.map((w, i) => (
                      <Link key={i} to={"/tags/" + w.id + "_" + encodeURIComponent(w.name)}>
                        {w.name},
                      </Link>
                    ))
                  : "No warnings applied"
                : "No warnings applied"}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2}>
              Category:
            </Col>
            <Col className="d-flex gap-2">
              <Link to={"/tags/" + encodeURIComponent(header.category.id)}>
                {header.category.name}
              </Link>
            </Col>
          </Row>
          {header.fandoms ? (
            header.fandoms.length !== 0 ? (
              <Row>
                <Col xs={12} md={2}>
                  Fandoms:
                </Col>
                <Col className="d-flex gap-2">
                  {header.fandoms.map((f, i) => (
                    <Link key={i} to={"/fandoms/" + f.id + "_" + encodeURIComponent(f.name)}>
                      {f.name},
                    </Link>
                  ))}
                </Col>
              </Row>
            ) : null
          ) : null}
          {header.relationships && header.relationships.length !== 0 ? (
              <Row>
                <Col xs={12} md={2}>
                  Relationships:
                </Col>
                <Col className="d-flex gap-2">
                  {header.relationships.map((t, i) => (
                    <Link key={i} to={"/tags/" + t.id + "_" + encodeURIComponent(t.name)}>
                      {t.name},
                    </Link>
                  ))}
                </Col>
              </Row>
          ) : null}
          {header.characters && header.characters.length !== 0 ? (
            <Row>
              <Col xs={12} md={2}>
                Characters:
              </Col>
              <Col className="d-flex gap-2">
                {header.characters.map((t, i) => (
                  <Link key={i} to={"/tags/" + t.id + "_" + encodeURIComponent(t.name)}>
                    {t.name},
                  </Link>
                ))}
              </Col>
            </Row>
          ) : null}
          {header.otherTags && header.otherTags.length !== 0 ? (
            <Row>
              <Col xs={12} md={2}>
                Other Tags:
              </Col>
              <Col className="d-flex gap-2">
                {header.otherTags.map((t, i) => (
                  <Link key={i} to={"/tags/" + t.id + "_" + encodeURIComponent(t.name)}>
                    {t.name},
                  </Link>
                ))}
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col xs={12} md={2}>
              Language:
            </Col>
            <Col className="d-flex gap-2">{header.language}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <div>
            Last updated: {header.updatedAt}, Chapters: {header.partsCount}
          </div>
          {header.visited ? <div>Last visited: {header.visited}</div> : null}
        </Card.Footer>
      </Card>
    );
  } else return <></>;
};

export default WorkCard;
