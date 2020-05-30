import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../navigationItems/navigationItems";
import BackDrop from "../../UI/Backdrop/backdrop";
import "./sideDrawer.css"


const sideDrawer = (props) => {

    return (

        <React.Fragment>

            <BackDrop show = {props.open} clicked = {props.closed}/>

            {props.open ? 
            <div className= "sideDrawer Open">

                <Logo height ="11%" marginBottom = "32px"/>

                <nav>
                    <NavigationItems/>
                </nav>
            </div> : 

            <div className= "sideDrawer Close">
                <Logo height ="11%" marginBottom = "32px"/>

                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
            }
        </React.Fragment>

    )

}

export default sideDrawer;