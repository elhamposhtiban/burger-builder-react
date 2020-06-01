import React, {Component} from "react";
import {connect} from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSumary";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/action/index"
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {

    state = {

        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients()
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

        if (this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

    this.props.onPurchasedInit()
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
        let burger =  this.props.error ? <p> INgredients can not loaded</p> : <Spinner/>
       
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
                    isAuth = {this.props.isAuthenticated}
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