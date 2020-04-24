import React from "react";
import "./Button.css";
 import Classes from "./Button.css"

const Button = (props) => {

    // tip: we must pass the string for css thats why i used join method here
return (
    <button  className = { [Classes.btn, props.btnType].join("")}
     onClick= {props.clicked}>
      {props.children}
    </button>

)
}

export default Button;