import * as actionTypes from "../store/action";

const initialState = {

    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 5 ,
};

const INGREDIENT_prices = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT : 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] +1
                },
                totalPrice: state.totalPrice + INGREDIENT_prices[action.ingredientName]
            }
            ;

        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] -1
                },
                totalPrice: state.totalPrice + INGREDIENT_prices[action.ingredientName]
            }
            ;

        default : 
        return state;
    }
    
}


export default reducer;