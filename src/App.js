import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout"


class App extends Component {


  render () {
    return (

      <div>
      


          <Router>
            <Layout>
                <Switch>
                <Route path="/checkout" component = {Checkout}/>
                <Route path="/auth" component = {Auth}/>
                <Route path="/logout" component = {Logout}/>
                <Route path="/orders" component = {Orders}/>
                <Route exact path ="/" component = {BurgerBuilder}/>
                </Switch>
            </Layout>
          </Router>


      

      </div>

    );
  }

}


export default App;
