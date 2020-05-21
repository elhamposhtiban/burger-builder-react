import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/checkout";
import Orders from "./container/Orders/Orders";


class App extends Component {


  render () {
    return (

      <div>
      


          <Router>
            <Layout>
                <Switch>
                <Route path="/checkout" component = {Checkout}/>
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
