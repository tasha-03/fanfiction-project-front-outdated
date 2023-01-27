import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { ListGroup } from "react-bootstrap";

const TagCard = ({ tid, tname }) => {
  return (
    <ListGroup.Item>
      <Link to={"/tags/" + tid + "_" + encodeURIComponent(tname)}>{tname}</Link>
    </ListGroup.Item>
  );
};

export default TagCard;
