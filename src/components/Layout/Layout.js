import React, {useState} from "react";
import {connect} from "react-redux";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/sideDrawer/sideDrawer"

const Layout = (props) =>  {
    

    const [showSideDrawer, setShowSIdeBar] = useState(false)
    // state = {
    //     showSideDrawer : false
    // }

  const  sideDrawerClosedHandler = () => {

       setShowSIdeBar(false);
    }

   const  sideDrawerToggleHandler = () => {

        setShowSIdeBar(!showSideDrawer)
    }

        return (

            <React.Fragment> 

                <Toolbar 
                isAuth= {props.isAuthenticated}
                drawerToggleClicked = {sideDrawerToggleHandler}/>
                <SideDrawer
                 isAuth= {props.isAuthenticated}
                open = {showSideDrawer} 
                closed = {sideDrawerClosedHandler}/>

                <main className="content">
                    {props.children}
                </main>

            </React.Fragment>
        )
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


    export default connect(mapStateToProps)(Layout);
