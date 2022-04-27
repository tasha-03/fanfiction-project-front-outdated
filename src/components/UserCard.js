import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { ListGroup } from "react-bootstrap";

const UserCard = ({ login }) => {
  return (
    <ListGroup.Item>
      <Link to={"/users/" + login + "/dashboard"}>{login}</Link>
    </ListGroup.Item>
  );
};

export default UserCard;
