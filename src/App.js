import React, {useEffect, Suspense} from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";

import Logout from "./container/Auth/Logout/Logout";
import * as actions from "../src/store/action/index"

const Checkout = React.lazy(() => {
  return import("./container/Checkout/checkout");
});

const Orders = React.lazy(() => {
  return import("./container/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./container/Auth/Auth");
});
const App = (props) => {

  useEffect( () => {

    props.onTryAutoSignup()
  
  },[]) 

    let routes = (
      <Switch>
        <Route path="/auth" render = {(props)=> <Auth {...props}/>}/>
        <Route exact path ="/" component = {BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )

    


    if (props.isAuthenticated) {
      routes = (
        
        <Switch>
        <Route path="/checkout" render = {(props)=> <Checkout {...props}/>}/>
        <Route path="/auth" render = {(props)=> <Auth {...props}/>}/>
        <Route path="/orders" render = {(props)=> <Orders {...props}/>}/>
        <Route path="/logout" component = {Logout}/>
        <Route exact path ="/" component = {BurgerBuilder}/>
        <Redirect to="/" />
        </Switch>

      )
    }
    return (

      <div>
      
         
            <Layout>
              <Suspense fallback={<p>... LOOOAding !</p>}>
              {routes}
              </Suspense>
            </Layout>
         


      </div>

    );
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
