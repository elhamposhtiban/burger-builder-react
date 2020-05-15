import React, {Component} from "react";
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
    
    //this component can be a functional component too

    render () {
        let ingredientSummary =Object.keys(this.props.ingredients)
        .map(igKey => {

        return (<li key= {igKey}>
                <span style = {{textTransform: "capitalize"}}> {igKey} </span>
                    :{this.props.ingredients[igKey]} 
            </li>)
        }) 
    return (
        <React.Fragment>
            <h3> Your Order</h3>
            <p> Delicious Burger with the following ingredients : </p>
    <p><strong> Total Price : {this.props.price.toFixed(2)}</strong></p>
            <ul> {ingredientSummary}</ul>
            <p>continue to checkout</p>
            
            <Button btnType="Danger" clicked = {this.props.purchaseCanceled}> Cancel</Button>
            <Button btnType="Success" clicked = {this.props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    )
    }

} 

// for btnType we have to use the name that we already use it in Button.css file !

export default OrderSummary;