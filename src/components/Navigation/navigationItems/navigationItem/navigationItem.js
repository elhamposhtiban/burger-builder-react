import React from "react";
import "./navigationItem.css"

const navigationItem = (props)=> {
    return(

    <li className="navigationItem"> 
         <a href={props.link}
            className={props.active ? "active" : null}>
            {props.children}
        </a>
    </li>
    )
}

export default navigationItem;