import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../navigationItems/navigationItems";
import BackDrop from "../../UI/Backdrop/backdrop";
import "./sideDrawer.css"


const sideDrawer = (props) => {
    return (

        <React.Fragment>

            <BackDrop show/>
            <div className= "sideDrawer">

            <Logo height ="11%" marginBottom = "32px"/>

            <nav>
                <NavigationItems/>
            </nav>

            </div>

        </React.Fragment>

    )

}

export default sideDrawer;