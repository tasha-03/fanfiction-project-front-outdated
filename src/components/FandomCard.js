import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const FandomCard = ({ fid, fname }) => {
  return (
    <ListGroup.Item>
      <Link to={"/fandoms/" + fid + "_" + encodeURIComponent(fname)}>
        {fname}
      </Link>
    </ListGroup.Item>
  );
};

export default FandomCard;
