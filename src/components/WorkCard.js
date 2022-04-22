import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const WorkCard = ({ workId }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={"/works/" + workId}>Work #{workId}</Link>
        </Card.Title>
        <Card.Text>Some random work description</Card.Text>
      </Card.Body>
      <Card.Footer>Some statistics</Card.Footer>
    </Card>
  );
};

export default WorkCard;
