import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout"
import * as actions from "../src/store/action/index"


class App extends Component {

  componentDidMount() {

    this.props.onTryAutoSignup()
  }

  render () {


    let routes = (
      <Switch>
        <Route path="/auth" component = {Auth}/>
        <Route exact path ="/" component = {BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )

    


    if (this.props.isAuthenticated) {
      routes = (
        
        <Switch>
        <Route path="/checkout" component = {Checkout}/>
        <Route path="/logout" component = {Logout}/>
        <Route path="/orders" component = {Orders}/>
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
