import * as actionTypes from "../action/actionTypes";
import {updateObject} from "../utility";

const initialState = {

    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
};

const INGREDIENT_prices = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

//here with these functions we are trying to organize our switch cases

const addIngredient = (state, action) => {

    const updatedIngredient = { [ action.ingredientName ] : state.ingredients [ action.ingredientName ] +1}

    const updatedIngredients = updateObject ( state.ingredients, updatedIngredient );

    const updatedState = {

        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_prices[action.ingredientName],
        building: true
    }
        return updateObject(state,updatedState)

}

const removeIngredient = (state, action) => {
    const updatedIng = { [ action.ingredientName ] : state.ingredients [ action.ingredientName ] -1}

    const updatedIngs = updateObject (state.ingredients, updatedIng);

    const updatedSt = {

        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_prices[action.ingredientName],
        building: true
    }
        return updateObject(state,updatedSt)
}

const setIngredients = (state, action) => {

    return updateObject(state, {

        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        },
        
        totalPrice: 5,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true });
};


const reducer = (state = initialState, action) => {

    switch ( action.type ) {

        case actionTypes.ADD_INGREDIENT : return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS : return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action)
        default : return state;
    }
    
}

export default reducer;