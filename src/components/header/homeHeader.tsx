import { useRouter } from "next/dist/client/router";
import Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

import { logout } from "./../redux/authReducer/authActions";
import Search from "./search";
import { isAuth } from "../utils/auth";

const homeHeader = () => {
  const router = useRouter();

  //redux

  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(logout);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        // className="sticky-top"
      >
        <Navbar.Brand href="/">
          Peddit <i className="fas fa-blog fa-2x ml-2"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Search />
            {!isAuth() ? (
              <>
                <Nav.Link href="/auth/register">Register</Nav.Link>
                <Nav.Link href="/auth/login">Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/subs/create">Create Sub/Community</Nav.Link>
                <Nav.Link onClick={Logout}>Log Out</Nav.Link>
              </>
            )}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default homeHeader;
