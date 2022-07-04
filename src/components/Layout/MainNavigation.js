import { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import logo from "../../images/logo.png";
import styles from "./MainNavigation.module.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  // Context access point to check which links should be enabled, considering user login status
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  // Logs the user out and redirects to the login page
  const logoutHandler = () => {
    authCtx.logout();

    history.replace("/auth");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <img
            src={logo}
            id="logo"
            alt="How is your mood?"
            width="50"
            height="50"
            className="d-inline-block align-middle"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {!authCtx.isLoggedIn && (
              <Nav.Link as={Link} to="/auth">
                Login
              </Nav.Link>
            )}
            {authCtx.isLoggedIn && (
              <Fragment>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/moods">
                  Moods
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav className="me-auto">
          {authCtx.isLoggedIn && (
            <Button variant="outline-light" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
