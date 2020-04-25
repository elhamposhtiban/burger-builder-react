import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import "./navigationItems.css"


const navigationItems = (props) => {
    return (
        
        <ul className="navigationItems">
            <NavigationItem link="/" active> Burger Builder</NavigationItem>
            <NavigationItem link="/"> Check Out</NavigationItem>
        </ul>
    )
}

export default navigationItems;