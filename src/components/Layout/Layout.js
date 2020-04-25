import React from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar"

const layout= (props) => 
    (
        <React.Fragment>

        <Toolbar/>
        <main className="content">
             {props.children}
        </main>
        </React.Fragment>

    )


    export default layout;
