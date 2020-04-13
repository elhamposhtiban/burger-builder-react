import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"


const Burger = (props) => {

    const transformIngredient = Object.keys(props.ingredients)
    .map(igKey=> {

        
        return [...Array(props.ingredients[igKey])].map( (_ ,i) => {

            return <BurgerIngredient key= {igKey + i} type = {igKey}/>

                })
        
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])

    console.log(transformIngredient)

    return(
        <div className="Burger">
         <BurgerIngredient type="bread-top"/>
            {transformIngredient}
         <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;