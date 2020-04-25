import React, {Component} from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/sideDrawer/sideDrawer"

class Layout extends Component {

    state = {
        showSideDrawer : true
    }

   sideDrawerClosedHandler = () => {

        this.setState({showSideDrawer : false});
    }

    render () {

        return (

            <React.Fragment> 
                <Toolbar/>
                <SideDrawer
                open = {this.state.showSideDrawer} 
                closed = {this.sideDrawerClosedHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}


    export default Layout;
