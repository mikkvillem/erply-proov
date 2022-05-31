import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../state/actions/auth";

const TopNav = ({ news }) => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signOutUser());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" className="mb-4">
      <Container>
        <Navbar.Brand href="/Home">
          <h1 style={{ color: "white" }}>News Viewer</h1>
        </Navbar.Brand>
        {state.loggedIn && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <Nav.Link className="text-white" href="/Home">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-white" href="/Profile">
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  variant="light"
                  as={Button}
                  onClick={() => handleClick()}
                  className="ml-3 text-black">
                  Log Out
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps)(TopNav);
