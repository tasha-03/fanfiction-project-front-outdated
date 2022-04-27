import { useState } from "react";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";

const PostWork = () => {
  const [currentFandoms, setCurrentFandoms] = useState([
    "Constantine (2005)",
    "Daredevil (2015-2017)",
    "Star Wars",
  ]);
  const [fandom, setFandom] = useState("");
  const [foundFandoms, setFoundFandoms] = useState([
    "Constantine (2005)",
    "Daredevil (2015-2017)",
    "Star Wars",
  ]);

  return (
    <Container className="py-3">
      <Row className="justify-content-center align-items-stretch">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating:</Form.Label>
              <Form.Select>
                <option>Not Rated</option>
                <option>General Audience</option>
                <option>Teenage Audience</option>
                <option>Mature Audience</option>
                <option>Explicit Content</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select>
                <option>Not Categorized</option>
                <option>Gen Fiction</option>
                <option>Female/Male</option>
                <option>Male/Male</option>
                <option>Female/Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Language:</Form.Label>
              <Form.Select defaultValue="English">
                <option>Arabic</option>
                <option>Chinese</option>
                <option>English</option>
                <option>French</option>
                <option>Gallifreyan</option>
                <option>German</option>
                <option>Italian</option>
                <option>Japanese</option>
                <option>Klingon</option>
                <option>Korean</option>
                <option>Portuguese</option>
                <option>Polish</option>
                <option>Russian</option>
                <option>Sindarin</option>
                <option>Spanish</option>
                <option>Turkish</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note:</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags:</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fandoms:</Form.Label>
              {currentFandoms.map((fandom, i) => (
                <Badge bg="light" text="dark" key={i}>{fandom}</Badge>
              ))}
              <Form.Control list="fandomsList" />
              <datalist id="fandomsList">
                {foundFandoms.map((fandom, i) => (
                  <option value={fandom} key={i} />
                ))}
              </datalist>
            </Form.Group>
            <Form.Group>
              <Form.Label>Warnings:</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostWork;
