import React from 'react';
import styles from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";

const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/knowledge/create"
    >
      <i className="far fa-plus-square"></i>
    </NavLink>
  );

  const addContainerIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/container/create"
    >
      <i className="far fa-plus-square"></i>
    </NavLink>
  );


function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <h4>
                Knowledge
                {addPostIcon}
            </h4>
            <a href = "#." target= "_blank">My Knowledge</a>
            <a href = "#." target= "_blank">Live Knowledge</a>
            <a href = "#." target= "_blank">Followed Knowledge</a>
            <a href = "#." target= "_blank">Popular Knowledge</a>
            <a href = "#." target= "_blank">Invasive Knowledge</a>
            <a href = "#." target= "_blank">Liked Knowledge</a>
            <a href = "#." target= "_blank">Most Commented Knowledge</a>
            <a href = "#." target= "_blank">Favourited Knowledge</a>
            <h4>
                Containers
                {addContainerIcon}
            </h4>
            <a href = "#." target= "_blank">My Containers</a>
            <a href = "#." target= "_blank">Public Containers</a>
            <a href = "#." target= "_blank">Popular Containers</a>
            <a href = "#." target= "_blank">Deepest Containers</a>
        </div>
    )
}

export default Sidebar;