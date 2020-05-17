import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../WithErrorHandler/WithErrorHandler"

const INGREDIENT_prices = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {

   

    state = {

        ingredients: null,

        totalPrice: 5 ,
        purchaseable : false,
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

      this.setState({purchaseable: sum > 0})
  }

  purchaseHandler = () => {
   this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
   }

   purchaseContinueHandler = () => {

    const queryPrams = []

    // here we are setting property name = to value for the search part ! 
    for (let i in this.state.ingredients) {

        queryPrams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    }

    queryPrams.push("price=" + this.state.totalPrice)

    console.log(queryPrams)

    const queryString = queryPrams.join("&")

    this.props.history.push({

        pathname: "/checkout",
        search: "?" + queryString
    })

   }


  addIngredientHandler = (type) => {

      const oldCount = this.state.ingredients[type]
      let updatedCount = oldCount + 1 
      let updatedIngredient = {
          ...this.state.ingredients
      }
      updatedIngredient[type] = updatedCount;

      const priceAddition = INGREDIENT_prices[type]
      const oldPrice = this.state.totalPrice;
      let newPrice = oldPrice + priceAddition;
      this.setState ({ingredients:updatedIngredient, totalPrice:newPrice})
      this.updatePurchaseHandler(updatedIngredient)

  }

  removeIngredientHandler = (type) => {

    const count = this.state.ingredients[type]
    let removeCount = count - 1 
    let removeIngredient = {
        ...this.state.ingredients
    }
    removeIngredient[type] = removeCount;

    const priceDecrease = INGREDIENT_prices[type]
    const price = this.state.totalPrice;
    let removePrice = price - priceDecrease;
    this.setState ({ingredients:removeIngredient, totalPrice:removePrice})
    this.updatePurchaseHandler(removeIngredient)
    console.log(" hi i am working")
    console.log(removePrice)
    console.log(removeIngredient)
      
}

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = 
        this.state.error ? <p> INgredients can not loaded</p> : <Spinner/>


        if (this.state.ingredients) {
          
            burger = (
                <React.Fragment> 
        
                    <Burger ingredients= {this.state.ingredients}/>
                    <BuildControls
                    addIngredientHandler = {this.addIngredientHandler}
                    removeIngredientHandler = {this.removeIngredientHandler}
                    disabled = {this.disabledInfo}
                    price= {this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purchaseHandler}/>
        
                </React.Fragment>
                )

                orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                price= {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);