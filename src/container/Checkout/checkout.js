import React, {Component} from "react";
import {connect} from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/Checkoutsummary"
import ContactData from "./ContactData/ContactData"
class Checkout extends Component {


    checkoutCanceledHandler = () => {

    this.props.history.goBack()

    }

    checkoutContinuedHandler = () => {

        this.props.history.replace("/checkout/contact-data")
    }



    render () {

        return (
            <div>
                <CheckoutSummary 
                ingredients = {this.props.ings}
                checkoutCanceled = {this.checkoutCanceledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route 
                path={this.props.match.path + "/contact-data"}
                component = {ContactData} />
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);






//     componentWillMount () {

//      const query = new URLSearchParams(this.props.location.search)

//      const ingredients = {};
//      let price = 0;
//      for (let param of query.entries()) {

//         //["salad", "1"]

//         if (param[0] === "price") {

//             price = param[1]

//         } else {

//             ingredients[param[0]] = +param[1]
//         }
// console.log("this is the price ", price)
//      }

//      this.setState({ingredients : ingredients, price: price})
//     }