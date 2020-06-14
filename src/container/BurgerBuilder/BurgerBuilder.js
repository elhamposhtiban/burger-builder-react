import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSumary";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/action/index"
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false)
    const {onInitIngredients} = props
    useEffect((props) => {
        props.onInitIngredients()
    }, [onInitIngredients]) 

   const updatePurchaseHandler= (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce(( sum, el )=> {
            return sum + el 
        }, 0)

        return sum > 0
    }

    const purchaseHandler = () => {

        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {

    props.onPurchasedInit()
    props.history.push("/checkout")

   }


        const disabledInfo = {
            ...props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger =  props.error ? <p> INgredients can not loaded</p> : <Spinner/>
       
        if (props.ings) {
          
            burger = (
                <React.Fragment> 
        
                    <Burger ingredients= {props.ings}/>
                    <BuildControls
                    addIngredientHandler = {props.onIngredientAdded}
                    removeIngredientHandler = {props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    price= {props.price}
                    purchaseable = {updatePurchaseHandler(props.ings)}
                    isAuth = {props.isAuthenticated}
                    ordered = {purchaseHandler}/>
        
                </React.Fragment>
                )

                orderSummary = <OrderSummary 
                ingredients = {props.ings}
                price= {props.price}
                purchaseCanceled = {purchaseCancelHandler}
                purchaseContinued = {purchaseContinueHandler}
                />;
        }

        return(
            <React.Fragment>
               
                <Modal show = {purchasing} 

                    modalClosed = {purchaseCancelHandler}>
                    
                    {orderSummary}

                </Modal>

                {burger}

            </React.Fragment>
        )
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch (actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch (actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch (actions.initIngredients()),
        onPurchasedInit : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
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