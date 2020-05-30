import React, {Component} from "react";
import {connect} from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/Checkoutsummary"
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/action/index"
class Checkout extends Component {


    checkoutCanceledHandler = () => {

    this.props.history.goBack()

    }

    checkoutContinuedHandler = () => {

        this.props.history.replace("/checkout/contact-data")
    }



    render () {

        let summary = <Redirect to="/"/>

        if(this.props.ings) {
            
            const purchasedRedirect = this.props.purchased? <Redirect to="/"/> : null;
            console.log(" i am working redirect")
            summary = (
                <div>
                    {purchasedRedirect}
                <CheckoutSummary 
                ingredients = {this.props.ings}
                checkoutCanceled = {this.checkoutCanceledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route 
                path={this.props.match.path + "/contact-data"}
                component = {ContactData} />
                </div>

            )
        }
        return  summary ;
    }
}



const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased: state.order.purchased

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