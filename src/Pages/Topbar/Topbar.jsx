import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";
import { Link, useParams } from "react-router-dom";
import { categories, platforms, sortby } from "../../Api/games-api";
import Loading from "../Loading/Loading";

export default function Topbar({ isLoggedIn, logOutUser }) {
  const [load, setLoad] = useState(false);
  const [path, setPath] = useState("");
  let params = useParams();

  useEffect(() => {
    setPath(document.location.pathname);
  }, [params]);

  function getCategoriesOptions() {
    return Object.keys(categories);
  }

  function getPlatformsOptions() {
    return Object.keys(platforms);
  }

  function getSortbyOptions() {
    return Object.keys(sortby);
  }

  function logOutButtonTapped() {
    logOutUser(
      () => {
        setLoad(true);
      },
      () => {
        setLoad(false);
      }
    );
  }

  return (
    <>
      <Loading bool={load} />
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>
            <Link
              className="navbar-brand me-5 nav-logo d-flex align-items-center"
              to="/"
            >
              <img src={logo} alt="" className="logo" />
              Game Over
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn ? (
              <>
                <Nav className="me-auto">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/all">
                    All
                  </Link>
                  <NavDropdown title="platforms" id="basic-nav-dropdown">
                    {getPlatformsOptions().map((path, index) => {
                      return (
                        <Link
                          key={`${path}${index}`}
                          className="dropdown-item"
                          to={`/platforms/${path}`}
                        >
                          {path}
                        </Link>
                      );
                    })}
                  </NavDropdown>
                  <NavDropdown title="sort by" id="basic-nav-dropdown">
                    {getSortbyOptions().map((path, index) => {
                      return (
                        <Link
                          key={`${path}${index}`}
                          className="dropdown-item"
                          to={`/sortby/${path}`}
                        >
                          {path}
                        </Link>
                      );
                    })}
                  </NavDropdown>
                  <NavDropdown title="categories" id="basic-nav-dropdown">
                    {getCategoriesOptions().map((path, index) => {
                      return (
                        <Link
                          key={`${path}${index}`}
                          className="dropdown-item"
                          to={`/categories/${path}`}
                        >
                          {path}
                        </Link>
                      );
                    })}
                  </NavDropdown>
                </Nav>
                <Nav className="ms-auto">
                  <Link
                    className="nav-link btn btn-outline-info text-info m-auto registerBtn bg-transparent"
                    to="/"
                    onClick={logOutButtonTapped}
                  >
                    Log out
                  </Link>
                </Nav>
              </>
            ) : (
              <Nav className="ms-auto">
                {path !== "/login" && path !== "/" ? (
                  <Link className="nav-link btn m-auto" to="/login">
                    Login
                  </Link>
                ) : (
                  <Link
                    className="nav-link btn btn-outline-info text-info m-auto registerBtn bg-transparent"
                    to="/register"
                  >
                    Join Free
                  </Link>
                )}
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
