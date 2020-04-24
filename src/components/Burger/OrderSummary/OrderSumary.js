import React from "react";
import Button from "../../UI/Button/Button"

const OrderSummary = (props) => {
    let ingredientSummary =Object.keys(props.ingredients)
    .map(igKey => {

    return (<li key= {igKey}>
            <span style = {{textTransform: "capitalize"}}> {igKey} </span>
                :{props.ingredients[igKey]} 
           </li>)
    }) 
return (
    <React.Fragment>
        <h3> Your Order</h3>
        <p> Delicious Burger with the following ingredients : </p>
<p><strong> Total Price : {props.price.toFixed(2)}</strong></p>
        <ul> {ingredientSummary}</ul>
        <p>continue to checkout</p>
        
        <Button btnType="Danger" clicked = {props.purchaseCanceled}> Cancel</Button>
        <Button btnType="Success" clicked = {props.purchaseContinued}>Continue</Button>
    </React.Fragment>
)
}

// for btnType we have to use the name that we already use it in Button.css file !

export default OrderSummary;