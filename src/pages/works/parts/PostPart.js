import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../../utilities/requests";
import "./PostPart.css";

const PostPart = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [titleChangable, setTitleChangable] = useState(true);
  const [description, setDescription] = useState("");
  const [descriptionChangable, setDescriptionChangable] = useState(true);
  const [note, setNote] = useState("");
  const [noteChangable, setNoteChangable] = useState(true);
  const [text, setText] = useState("<p></p>");
  const [order, setOrder] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [allOrder, setAllOrder] = useState([]);

  const workId = location.pathname.split("/")[2];

  const getParts = async () => {
    const response = await getRequest(`parts/work/${workId}/all`);
    if (!response.success) {
      return alert(response.message);
    }
    if (response.parts.length === 0) {
      const res = await getRequest(`works/myworks/${workId}`);
      if (!res.success) {
        return alert(res.message);
      }
      setTitle(res.work.title);
      setTitleChangable(false);
      setDescription(res.work.description);
      setDescriptionChangable(false);
      setNote(res.work.note);
      setNoteChangable(false);
    }
    setAllOrder(response.parts);
  };

  useEffect(() => {
    getParts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postRequest("parts", {
      workId,
      title,
      description,
      note,
      text,
      order,
      isVisible: !isHidden,
    });
    if (!response.success) {
      return alert(response.message);
    }
    navigate("../?part=" + response.order);
  };

  return (
    <Container id="PostWork" className="py-3">
      <Row className="justify-content-center align-items-stretch">
        <Col sm={12} md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={!titleChangable}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!descriptionChangable}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={!noteChangable}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <CKEditor
                style={{ minHeight: "50vh" }}
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                  ],
                  heading: {
                    options: [
                      {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                      },
                      {
                        model: "heading1",
                        view: "h5",
                        title: "Heading 1",
                        class: "ck-heading_heading5",
                      },
                      {
                        model: "heading2",
                        view: "h6",
                        title: "Heading 2",
                        class: "ck-heading_heading6",
                      },
                    ],
                  },
                }}
                data={text}
                onChange={(e, editor) => setText(editor.getData())}
              />
            </Form.Group>
            <Form.Group className="d-flex">
              <Form.Check
                type="checkbox"
                label="Keep as a draft"
                defaultChecked={false}
                onChange={(e) => setIsHidden(e.target.checked)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value={0}>As Chapter 1</option>
                {allOrder.map((part, i) => (
                  <option key={i} value={part.order + 1}>
                    After Chapter {part.order + 1}: {part.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>
              Post Part
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostPart;
