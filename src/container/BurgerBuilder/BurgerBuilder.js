import React, {Component} from "react";
import {connect} from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../WithErrorHandler/WithErrorHandler";
import * as actionTypes from "../../store/action"


class BurgerBuilder extends Component {

    state = {

        purchasing: false,
        loading: false,
        error : false 
    }

    componentDidMount () {

        axios.get("https://burger-react-73e07.firebaseio.com/ingredients.json")
        .then(response => {
            this.setState({ingredients:response.data})
        })
        .catch(error => {  this.setState({error : true})})
    }

    updatePurchaseHandler (ingredients)  {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce(( sum, el )=> {
            return sum + el 
        }, 0)

        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

    this.props.history.push("/checkout")

   }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = 
        this.state.error ? <p> INgredients can not loaded</p> : <Spinner/>


        if (this.props.ings) {
          
            burger = (
                <React.Fragment> 
        
                    <Burger ingredients= {this.props.ings}/>
                    <BuildControls
                    addIngredientHandler = {this.props.onIngredientAdded}
                    removeIngredientHandler = {this.props.onIngredientRemoved}
                    disabled = {this.disabledInfo}
                    price= {this.props.price}
                    purchaseable = {this.updatePurchaseHandler(this.props.ings)}
                    ordered = {this.purchaseHandler}/>
        
                </React.Fragment>
                )

                orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                price= {this.props.price}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }


        return(
            <React.Fragment>
               
                <Modal show = {this.state.purchasing} 

                    modalClosed = {this.purchaseCancelHandler}>
                    
                    {orderSummary}

                </Modal>

                {burger}

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch ({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps ) (withErrorHandler(BurgerBuilder, axios));








//addIngredientHandler = (type) => {

    //       const oldCount = this.state.ingredients[type]
    //       let updatedCount = oldCount + 1 
    //       let updatedIngredient = {
    //           ...this.state.ingredients
    //       }
    //       updatedIngredient[type] = updatedCount;
    
    //       const priceAddition = INGREDIENT_prices[type]
    //       const oldPrice = this.state.totalPrice;
    //       let newPrice = oldPrice + priceAddition;
    //       this.setState ({ingredients:updatedIngredient, totalPrice:newPrice})
    //       this.updatePurchaseHandler(updatedIngredient)
    
    //   }
    
    //   removeIngredientHandler = (type) => {
    
    //     const count = this.state.ingredients[type]
    //     let removeCount = count - 1 
    //     let removeIngredient = {
    //         ...this.state.ingredients
    //     }
    //     removeIngredient[type] = removeCount;
    
    //     const priceDecrease = INGREDIENT_prices[type]
    //     const price = this.state.totalPrice;
    //     let removePrice = price - priceDecrease;
    //     this.setState ({ingredients:removeIngredient, totalPrice:removePrice})
    //     this.updatePurchaseHandler(removeIngredient)
    //     console.log(" hi i am working")
    //     console.log(removePrice)
    //     console.log(removeIngredient)
          
    // }