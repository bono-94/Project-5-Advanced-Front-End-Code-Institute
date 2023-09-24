import React from 'react';
import css from "./css/Sidebar.module.css";

function Sidebar() {
    return (
        <div className={css.sidebar}>
            <h4>Knowledge</h4>
            <a href = "#." target= "_blank">My Knowledge</a>
            <a href = "#." target= "_blank">Live Knowledge</a>
            <a href = "#." target= "_blank">Followed Knowledge</a>
            <a href = "#." target= "_blank">Popular Knowledge</a>
            <a href = "#." target= "_blank">Invasive Knowledge</a>
            <a href = "#." target= "_blank">Most Liked Knowledge</a>
            <a href = "#." target= "_blank">Most Commented Knowledge</a>
            <a href = "#." target= "_blank">Most Favourited Knowledge</a>
            <h4>Containers</h4>
            <a href = "#." target= "_blank">My Containers</a>
            <a href = "#." target= "_blank">Public Containers</a>
            <a href = "#." target= "_blank">Popular Containers</a>
            <a href = "#." target= "_blank">Deepest Containers</a>
        </div>
    )
}

export default Sidebar;