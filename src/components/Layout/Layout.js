import React from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/sideDrawer/sideDrawer"

const layout= (props) => 
    (
        <React.Fragment>

        <Toolbar/>
        <SideDrawer/>
        <main className="content">
             {props.children}
        </main>
        </React.Fragment>

    )


    export default layout;
