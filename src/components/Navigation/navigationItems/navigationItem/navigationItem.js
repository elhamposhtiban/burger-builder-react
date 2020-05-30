import React from "react";
import {NavLink} from "react-router-dom"
import "./navigationItem.css";

const navigationItem = (props)=> {
    return(

    <li className="navigationItem"> 
        <NavLink to={props.link}
            activeClassName={props.active ? "active" : null}>
            {props.children}
        </NavLink>
    </li>
    )
}

export default navigationItem;