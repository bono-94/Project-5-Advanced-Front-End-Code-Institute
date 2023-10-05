import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const location = useLocation();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const isActiveLink = (match, location) => {

    if (location.pathname.startsWith("/knowledge")) {
      return true; 
    }
    return false;
  };

  const isActiveLinkContainers = (match, location) => {

    if (location.pathname.startsWith("/container")) {
      return true; 
    }
    return false;
  };

  const loggedInIcons = (
    <>
      <NavLink
        isActive={isActiveLink}
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/knowledge/live"
      >
        <i className="fas fa-book"></i>
        <span>
          KNOWL3DG3
        </span>
      </NavLink>
      <NavLink
      isActive={isActiveLinkContainers}
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/containers"
      >
        <i className="fas fa-box"></i>
        <span>
          CONTAINERS
        </span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/support"
      >
        <i className="fas fa-headset"></i>
        <span>
          SUPPORT
        </span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profile/${currentUser?.profile_id}`}
      >
        <div className={styles.ProfileLink}>
          <Avatar src={currentUser?.profile_image} height={35} />
          <span>PROFILE</span>
        </div>
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>
        <span>
          LOGOUT
        </span>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>
        <span>
          REGISTER
        </span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>
        <span>
          LOGIN
        </span>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container className={styles.NavBarContainer} fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="55" className="logo-home" style={{
            marginLeft: '10px',
          }}/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          style={{
            fontSize: '14px',
            padding: '4px 8px',
            color: expanded ? 'orange' : 'white', // Text color
            backgroundColor: expanded ? 'white' : 'orange', // Background color
            marginRight: '10px',
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;