import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/input"
import "./ContactData.css";


class ContactData extends Component {

    state = {
        
        orderForm: {

                name: {

                    elementType: "input",

                    elementConfig: {
                        type: "text",
                        placeholder: "Your Name"
                    },
                    
                    value: " ",

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
                    
                    value: " ",
                    
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
                    
                    value: " ",
                    
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
                    
                    value: " ",
                    
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
                    
                    value: " ",
                    
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
                    
                    value: " ",
                    validation: {},
                    valid: true
                }
        },
        formIsValid : false,
        loading: false
    }


    //this is for submitting data

    orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients)
    console.log(this.props.price)

    this.setState({ loading: true })

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {

    ingredients: this.props.ingredients,

    price: this.props.price,

    orderData : formData


    }

    axios.post("/orders.json", order)
    .then(response => {

        this.setState({ loading: false })
        this.props.history.push("/")
    })
    .catch(error => 

        this.setState({ loading: false })
        
    )

    }

    //this is for validation
    checkValidity (value, rules) {

        let isValid = true;

        if (rules.required) {

            isValid = value.trim() !== " " && isValid

        }

        if (rules.minLength) {

            isValid = value.length >= rules.minLength && isValid

        }

        if (rules.maxLength) {

            isValid = value.length <= rules.maxLength && isValid

          
        }
        console.log( "this is is valid", isValid)
  
        return isValid
    }

  

    //using this method in order to give on change to the form

    inputChangedHandler = (event, inputIdentifier) => {

        //we should spread this object 2 times in order to have access to nested values
            console.log(event.target.value)
            const updatedForm = {
                ...this.state.orderForm
            }

            const updatedElement = {
                ...updatedForm[inputIdentifier]
            }

            updatedElement.value = event.target.value;

            //in the line below we are giving validation to the element 

            updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
            updatedElement.touched=true

            updatedForm[inputIdentifier] = updatedElement

            let formIsValid = true; 
            for (let inputIdentifier in updatedForm ) {
                    formIsValid = updatedForm[inputIdentifier].valid && formIsValid
            }
            console.log(updatedElement)

            this.setState({orderForm: updatedForm, formIsValid: formIsValid})


    }
    render () {

        const formElementArray = [];
        for(let key in this.state.orderForm) {

           formElementArray.push({
               id: key,
               config: this.state.orderForm[key]
           })

        }

        let form = ( 

        <form onSubmit={this.orderHandler}>
          
                {formElementArray.map(formElement => {
                    return (
                        <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event)=> this.inputChangedHandler(event, formElement.id)}/>
                    )
                })}
            <Button btnType="Success" 
            clicked ={this.orderHandler} 
            disabled = {!this.state.formIsValid}> ORDER !</Button>
        </form>
        
        )

        if (this.state.loading) {
          form = <Spinner/>
        }

        return (
            <div className = "ContactData">
                <h1> Enter your contact Data</h1>
                {form}
            </div>
        )
    }
}


export default ContactData;