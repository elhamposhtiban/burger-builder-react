import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import "./navigationItems.css"


const navigationItems = (props) => {
    return (

            <ul className="navigationItems">
                <NavigationItem link="/"> Burger Builder</NavigationItem>
                {props.isAuthenticated? <NavigationItem link="/orders"> Orders</NavigationItem> : null } 
                {!props.isAuthenticated? 
                <NavigationItem link="/auth"> Authentication</NavigationItem> :
                <NavigationItem link="/logout"> Logout</NavigationItem>}
            </ul>

    )
}

export default navigationItems;