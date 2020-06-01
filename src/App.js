import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";

import Logout from "./container/Auth/Logout/Logout";
import asyncComponent from "../src/asyncComponent/asyncComponent"
import * as actions from "../src/store/action/index"

const asyncCheckout = asyncComponent(() => {
  return import("./container/Checkout/checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./container/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./container/Auth/Auth");
});
class App extends Component {

  componentDidMount() {

    this.props.onTryAutoSignup()
  }

  render () {


    let routes = (
      <Switch>
        <Route path="/auth" component = {asyncAuth}/>
        <Route exact path ="/" component = {BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )

    


    if (this.props.isAuthenticated) {
      routes = (
        
        <Switch>
        <Route path="/checkout" component = {asyncCheckout}/>
        <Route path="/auth" component = {asyncAuth}/>
        <Route path="/logout" component = {Logout}/>
        <Route path="/orders" component = {asyncOrders}/>
        <Route exact path ="/" component = {BurgerBuilder}/>
        <Redirect to="/" />
        </Switch>

      )
    }
    return (

      <div>
      
         
            <Layout>
                {routes}
            </Layout>
         


      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup :() => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
