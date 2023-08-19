import React from "react";
import css from "./css/Sidebar.module.css";

function EventsFunctional() {
  
  function clickHandler(){
    console.log("Clicked the functional button!")
  }
  
  return (
    <div>
        <button onClick={clickHandler}>
            Click me! - I am functional component
        </button>
    </div>
  )
}

export default EventsFunctional