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
  Image,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { logout } from "../features/authSlice";
import logo from "../images/logo.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(useSelector((state) => state.auth.token));

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const menu = isLoggedIn ? (
    <Nav className="flex-row gap-1 align-items-center">
      {currentUser.emailIsConfirmed ? null : (
        <Nav.Link as={Link} to="/confirm-email" style={{ color: "red" }}>
          Your profile isn't confirmed
        </Nav.Link>
      )}
      <Nav.Link
        as={Link}
        to={"/users/" + (currentUser ? currentUser.login : null)}
      >
        Hello, {currentUser ? currentUser.login : null}
      </Nav.Link>
      <Dropdown id="menuDropdown">
        <Dropdown.Toggle />
        <Dropdown.Menu align="end">
          <Dropdown.Item
            as={Link}
            to={"/users/" + (currentUser ? currentUser.login : null)}
          >
            My profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/works/new">
            Post work
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={
              "/users/" +
              (currentUser ? currentUser.login : null) +
              "/preferences"
            }
          >
            Preferences
          </Dropdown.Item>
          <Dropdown.Item id="logoutBtn" onClick={handleLogout}>
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  ) : (
    <Nav className="flex-row">
      <Nav.Link
        style={{ paddingRight: "0.5rem", paddingLeft: "0.5rem" }}
        as={Link}
        to="/login"
      >
        Log In
      </Nav.Link>
      <Nav.Link
        style={{ paddingRight: "0.5rem", paddingLeft: "0.5rem" }}
        as={Link}
        to="/signup"
      >
        Sign Up
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
              src={logo}
              style={{ height: "1.5rem", marginRight: "1rem" }}
            />
            Fanfiction-Project
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
                <NavDropdown.Item as={Link} to="/works/search?limit=20&page=1">
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
