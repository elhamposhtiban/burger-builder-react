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
                        type: "email",
                        placeholder: "Your Name"
                    },
                    
                    value: " ",

                    validation: {
                        
                    }
                },

                street:  {

                    elementType: "input",

                    elementConfig: {
                        type: "email",
                        placeholder: "Your Street"
                    },
                    
                    value: " "
                },
                zipCode: {

                    elementType: "input",

                    elementConfig: {
                        type: "number",
                        placeholder: "Your ZipCode"
                    },
                    
                    value: " "
                },
                country:  {

                    elementType: "input",

                    elementConfig: {
                        type: "email",
                        placeholder: "Country"
                    },
                    
                    value: " "
                },
                email:  {

                    elementType: "input",

                    elementConfig: {
                        type: "email",
                        placeholder: "Your E-mail"
                    },
                    
                    value: " "
                },
                deliveryMethod:  {

                    elementType: "select",

                    elementConfig: {
                        options: [
                            { value: "fastest", displayValue: "Fastest"},
                            { value: "cheapest", displayValue: "Cheapest"},
                        ]
                    },
                    
                    value: " "
                }
        },

        loading: false
    }

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
            updatedForm[inputIdentifier] = updatedElement

            this.setState({orderForm: updatedForm})


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
                        changed={(event)=> this.inputChangedHandler(event, formElement.id)}/>
                    )
                })}
            <Button btnType="Success" 
            clicked ={this.orderHandler}> ORDER !</Button>
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