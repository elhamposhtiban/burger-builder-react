import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/checkout"

class App extends Component {


  render () {
    return (

      <div>
      
        <Layout>
          <Router>
              <Switch>
              <Route exact path="/checkout" component = {Checkout}/>
              <Route exact path ="/" component = {BurgerBuilder}/>
              </Switch>

          </Router>
          {/* <BurgerBuilder/>
          <Checkout/> */}

        </Layout>
      

      </div>

    );
  }

}


export default App;
