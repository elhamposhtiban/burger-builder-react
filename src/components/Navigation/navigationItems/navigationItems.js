import React from "react";
import {Router} from "react-router-dom";
import NavigationItem from "./navigationItem/navigationItem";
import "./navigationItems.css"


const navigationItems = (props) => {
    return (

            <ul className="navigationItems">
                <NavigationItem link="/"> Burger Builder</NavigationItem>
                <NavigationItem link="/orders"> Orders</NavigationItem>
            </ul>

    )
}

export default navigationItems;