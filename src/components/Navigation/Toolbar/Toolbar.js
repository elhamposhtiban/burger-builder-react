import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo"
import NavigationItems from "../navigationItems/navigationItems";

const toolbar = (props) => {
    return (
    <header className= "Toolbar">
        <div>Menu</div>
        <Logo/>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
    )
}

export default toolbar;