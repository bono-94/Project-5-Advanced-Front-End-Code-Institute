import React from 'react';
import styles from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

function Sidebar() {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const addPostIcon = (
    <NavLink
      className={`far fa-plus-square ${styles.beat}`}
      activeClassName={styles.Active}
      to="/knowledge/create"
    >
    </NavLink>
  );

  const addContainerIcon = (
    <NavLink
      className={`far fa-plus-square ${styles.beat}`}
      activeClassName={styles.Active}
      to="/container/create"
    >
    </NavLink>
  );


  return (
    <div className={styles.sidebar} id="sidebar">
      <div className={styles.section}>
        <h5>Knowledge</h5>
        <div className={styles.icons}>{addPostIcon}</div>
      </div>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/knowledge/live"
      >
        <span>Live Knowledge</span>
        <i className="fas fa-globe"></i>
      </NavLink>
      
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/knowledge/followed"
      >
        <span>Followed Knowledge</span>
        <i className="fas fa-users"></i>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/knowledge/liked"
      >
        <span>Liked Knowledge</span>
        <i className="fas fa-heart"></i>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/knowledge/favourited"
      >
        <span>Favourite Knowledge</span>
        <i className="fas fa-star"></i>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profile/${currentUser?.profile_id}`}
      >
        <span>My Knowledge</span>
        <i className="fas fa-universal-access"></i>
      </NavLink>
      <hr></hr>
      <div className={styles.section}>
        <h5>Containers</h5>
        <div className={styles.icons}>{addContainerIcon}</div>
      </div>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/containers/private"
      >
        <span>Private Containers</span>
        <i className="fas fa-user-secret"></i>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/containers/public"
      >
        <span>Public Containers</span>
        <i className="fas fa-bullhorn"></i>
      </NavLink>
    </div>
  );
}

export default Sidebar;