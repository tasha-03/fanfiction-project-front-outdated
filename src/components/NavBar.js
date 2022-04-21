import { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { getRequest } from "../utilities/requests";

const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoggedIn } = useToken();
  console.log(isLoggedIn);
  console.log(currentUser);

  useEffect(() => {
    if (isLoggedIn) {
      const getCurrentUser = async () => {
        const res = await getRequest("users/myself");
        setCurrentUser(res.user);
      };
      getCurrentUser();
      console.log("got user", currentUser);
    } else {
      setCurrentUser(null)
    }
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menu = isLoggedIn ? (
    <Nav>
      <Nav.Link
        as={Link}
        to={"/users/" + (currentUser ? currentUser.login : null)}
      >
        Hello, {currentUser ? currentUser.login : null}
      </Nav.Link>
      <Dropdown>
        <Dropdown.Toggle />
        <Dropdown.Menu align="end">
          <Dropdown.Item as={Link} to={"/users/"}>
            My profile
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  ) : (
    <Nav>
      <Nav.Link as={Link} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Sign Up
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            LOGO
          </Navbar.Brand>
          {menu}
        </Container>
      </Navbar>
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <NavDropdown title="Browse">
                <NavDropdown.Item as={Link} to="/fandoms/search">
                  Fandoms
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tags/search">
                  Tags
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/users/search">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/works/search">
                  Works
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="About">
                <NavDropdown.Item as={Link} to="/about/FAQ">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/socials">
                  Socials
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/privacy">
                  Privacy
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search" />
              <Button>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
