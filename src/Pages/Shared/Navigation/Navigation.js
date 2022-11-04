import React from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { useState,useContext } from "react";
import Logo from "../../../assets/logo.png";
import swal from "sweetalert";
import {BASE_URL} from '../../../Utiles/constants';
import {isSeller} from '../../../hooks/useFirebase.js'


const Navigation = () => {
  const { user, logOut,becomeASeller } = useAuth();


  
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const handleOffCanvasClose = () => setOffCanvasShow(false);
  const handleOffCanvasShow = () => setOffCanvasShow(true);
  console.log("user:",user.email)
  return (
    <Navbar className="text-dark" sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="130"
            height="60"
            className="d-inline-block align-top"
            alt="App Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <NavLink
              className="text-decoration-none me-lg-3"
              exact
              to="/home"
              style={{ color: "#161c2d" }}
              activeStyle={{
                fontWeight: "bold",
                color: "#0275d8",
              }}
            >
              Home
            </NavLink>
            <NavLink
              className="text-decoration-none me-lg-3"
              exact
              to="/cars/all-cars"
              style={{ color: "#161c2d" }}
              activeStyle={{
                fontWeight: "bold",
                color: "#0275d8",
              }}
            >
              Cars
            </NavLink>
            {user?.email && (
              <NavLink
                className="text-decoration-none"
                to="/dashboard"
                style={{ color: "#161c2d" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#0275d8",
                }}
              >
                Dashboard
              </NavLink>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user?.email ? (
              <>
                <button
                  className="text-decoration-none me-lg-3"
                  //   exact
                  //   to="/dashboard/add-car"
                  style={{ color: "#161c2d", alignSelf: "center",border: 'none', backgroundColor: 'transparent'}}
                  //   activeStyle={{
                  //     fontWeight: "bold",
                  //     color: "#0275d8",
                  //   }}
                  onClick={() => {
                    swal({
                      text: "Do you want to become a Seller?",
                      icon: "info",
                      button: {
                        text: "Yes!",
                        closeModal: true,
                      },
                    })
                      .then((willSearch) => {
                        if (willSearch) {
                          becomeASeller() 
                          }
                      })
                      .then((result) => {
                        if (result) {
                          swal({
                            text: "Congratulations You are now a Seller",
                            icon: "success",
                            button: {
                              text: "Ok",
                              closeModal: true,
                            },
                          });

                        }
                        result.json();
                      })
                      .then((json) => console.log(json))
                      .catch((err) => {
                        swal(
                          " ",
                          "Congratulations You are now a Seller",
                          "success"
                        );
                      });
                  }}
                >
                  Become A Seller
                </button>
                {user?.photoURL ? (
                  <img
                    className="img-fluid rounded-circle mx-auto mt-2 mt-lg-0"
                    src={user?.photoURL}
                    alt="User"
                    style={{ width: 40, height: 40 }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={user?.displayName}
                    onClick={handleOffCanvasShow}
                  ></img>
                ) : (
                  <FontAwesomeIcon
                    className="fs-1 text-secondary mx-auto mt-2 mt-lg-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={user?.displayName}
                    icon={faUserCircle}
                    onClick={handleOffCanvasShow}
                  />
                )}
              </>
            ) : (
              <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
                <NavLink
                  className="text-decoration-none me-lg-3"
                  exact
                  to="/sign-in"
                  style={{ color: "#161c2d" }}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#0275d8",
                  }}
                >
                  Sign In
                </NavLink>
                <NavLink
                  className="text-decoration-none me-lg-3"
                  exact
                  to="/join"
                  style={{ color: "#161c2d" }}
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#0275d8",
                  }}
                >
                  Join
                </NavLink>
              </div>
            )}

            <Offcanvas
              show={offCanvasShow}
              onHide={handleOffCanvasClose}
              placement="end"
              style={{ maxWidth: 300 }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="text-center">
                  {user?.photoURL ? (
                    <img
                      className=" img-fluid rounded-circle settings-user-img"
                      src={user?.photoURL}
                      alt=""
                    ></img>
                  ) : (
                    <FontAwesomeIcon
                      className="fs-1 text-secondary settings-user-img"
                      icon={faUserCircle}
                    />
                  )}
                  <p className="mt-2 text-dark">{user?.displayName}</p>
                  <div className="divider d-flex align-items-center my-4"></div>
                  <button
                    onClick={() => {
                      logOut();
                      handleOffCanvasClose();
                    }}
                    className="btn btn-dark w-100"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                  </button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
