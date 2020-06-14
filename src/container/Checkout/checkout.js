import React from "react";
import {connect} from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/Checkoutsummary"
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {


   const  checkoutCanceledHandler = () => {

    props.history.goBack()

    }

    const  checkoutContinuedHandler = () => {

        props.history.replace("/checkout/contact-data")
    }


        let summary = <Redirect to="/"/>

        if(props.ings) {
            
            const purchasedRedirect = props.purchased? <Redirect to="/"/> : null;
            console.log(" i am working redirect")
            summary = (
                <div>
                    {purchasedRedirect}
                <CheckoutSummary 
                ingredients = {props.ings}
                checkoutCanceled = {checkoutCanceledHandler}
                checkoutContinued = {checkoutContinuedHandler}/>
                <Route 
                path={props.match.path + "/contact-data"}
                component = {ContactData} />
                </div>

            )
        }
        return  summary ;

}



const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
}



export default connect(mapStateToProps)(Checkout);






//     componentWillMount () {

//      const query = new URLSearchParams(props.location.search)

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

//      setState({ingredients : ingredients, price: price})
//     }