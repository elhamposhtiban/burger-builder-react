import React, {useState} from "react";
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/input";
import withErrorHandler from "../../../WithErrorHandler/WithErrorHandler";
import * as actions from "../../../store/action/index";
import {updateObject, checkValidity} from "../../../shared/utility";
import "./ContactData.css";


const ContactData = (props) =>  {

  const [orderForm, setOrderForm] = useState ({
                name: {

                    elementType: "input",

                    elementConfig: {
                        type: "text",
                        placeholder: "Your Name"
                    },
                    
                    value: "",

                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },

                street:  {

                    elementType: "input",

                    elementConfig: {
                        type: "text",
                        placeholder: "Your Street"
                    },
                    
                    value: "",
                    
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },

                zipCode: {

                    elementType: "input",

                    elementConfig: {

                        type: "number",
                        placeholder: "Your ZipCode"
                    },
                    
                    value: "",
                    
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },

                    valid: false,
                    touched: false


                },

                country:  {

                    elementType: "input",

                    elementConfig: {
                        type: "text",
                        placeholder: "Country"
                    },
                    
                    value: "",
                    
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },

                email:  {

                    elementType: "input",

                    elementConfig: {
                        type: "email",
                        placeholder: "Your E-mail"
                    },
                    
                    value: "",
                    
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },

                deliveryMethod:  {

                    elementType: "select",

                    elementConfig: {
                        options: [
                            { value: "fastest", displayValue: "Fastest"},
                            { value: "cheapest", displayValue: "Cheapest"},
                        ]
                    },
                    
                    value: "fastest",
                    validation: {},
                    valid: true
                }
        })

      const [formIsValid, setFormIsValid] = useState(false)  
    


    //this is for submitting data

    const orderHandler = (event) => {

    event.preventDefault();
    console.log(props.ings)
    console.log(props.price)


    const formData = {};
    for (let formElementIdentifier in orderForm) {
        formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order = {

    ingredients: props.ings,

    price: props.price,

    orderData : formData,

    userId: props.userId
    }

    props.onOrderBurger(order, props.token)

    }

    //using this method in order to give on change to the form

    const inputChangedHandler = (event, inputIdentifier) => {

        //we should spread this object 2 times in order to have access to nested values
            console.log(event.target.value)

            const updatedElement =updateObject(orderForm[inputIdentifier], {
                    value: event.target.value,
                     //in the line below we are giving validation to the element
                    valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
                    touched: true
            })

            const updatedForm = updateObject(orderForm, { 
                [inputIdentifier] : updatedElement
             }) 

            let formIsValid = true; 
            for (let inputIdentifier in updatedForm ) {
                    formIsValid = updatedForm[inputIdentifier].valid && formIsValid
            }
            console.log(updatedElement)
                setOrderForm(updatedForm)
                setFormIsValid(formIsValid)
          

    }

    const formElementArray = [];
    for(let key in orderForm) {

        formElementArray.push({
            id: key,
            config: orderForm[key]
        })

    }

    let form = ( 

    <form onSubmit={orderHandler}>
        
            {formElementArray.map(formElement => {
                return (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event)=> inputChangedHandler(event, formElement.id)}/>
                )
            })}
        <Button btnType="Success" 
        clicked ={orderHandler} 
        disabled = {!formIsValid}> ORDER !</Button>
    </form>
    
    )

    if (props.loading) {
        form = <Spinner/>
    }

    return (
        <div className = "ContactData">
            <h1> Enter your contact Data</h1>
            {form}
        </div>
    )

}

    


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch (actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));