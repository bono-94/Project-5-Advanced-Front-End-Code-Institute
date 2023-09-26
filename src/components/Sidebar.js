import React from 'react';
import styles from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";

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

function Sidebar() {
    return (
        <div className={styles.sidebar} id="sidebar">
            <div className={styles.section}>
              <h5>Knowledge</h5>
              <div className={styles.icons}>{addPostIcon}</div>
            </div>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/posts/user"
            >
              <i className="fas fa-universal-access"></i>
              <span>My Knowledge</span> 
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/feed"
            >
              <i className="fas fa-globe"></i> Live Knowledge
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/feed"
            >
              <i className="fas fa-users"></i> Followed Knowledge
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/liked"
            >
              <i className="fas fa-heart"></i> Liked Knowledge
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/favourited"
            >
              <i className="fas fa-star"></i> Favourite Knowledge
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
              <i className="fas fa-user-secret"></i> Private Containers
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/containers/public"
            >
              <i className="fas fa-network-wired"></i> Public Containers
            </NavLink>
        </div>
    )
}

export default Sidebar;