import React from "react";
import { withRouter} from "react-router-dom";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"


const Burger = (props) => {

    let transformIngredient = Object.keys(props.ingredients)
    .map(igKey=> {

        
        return [...Array(props.ingredients[igKey])].map( (_ ,i) => {

            return <BurgerIngredient key= {igKey + i} type = {igKey}/>

                })
        
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])

    return(
        <div className="Burger">
         <BurgerIngredient type="bread-top"/>
            {transformIngredient.length? transformIngredient : <p> please add some ingredient !</p>}
         <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(Burger);