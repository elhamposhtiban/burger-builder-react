import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo"
import NavigationItems from "../navigationItems/navigationItems";
import DrawerToggle from "../sideDrawer/DrawerToggle/DrawerToggle"

const toolbar = (props) => {
    return (
    <header className= "Toolbar">
       
            <DrawerToggle clicked = {props.drawerToggleClicked}/>
            <Logo height="80%"/>

        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>

    </header>
    )
}

export default toolbar;