import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl"

const Controls = [  {label:"Salad", type:"salad"},
                    {label:"Bacon", type:"bacon"},
                    {label:"Cheese", type:"cheese"},
                    {label:"Meat", type:"meat"},
                ]

const buildControls = (props) => {
    return (
        <div className="BuildControls">
            <strong><p> Current Price : {props.price.toFixed(2)}</p></strong>
        {Controls.map (ctrl => (
            <BuildControl key={ctrl.label}
                label = {ctrl.label}
                addIngredientHandler = {() => props.addIngredientHandler(ctrl.type)}
                removeIngredientHandler = {() => props.removeIngredientHandler(ctrl.type)}
                disabled = {() => props.disabledInfo[ctrl.type]}/>
        ))}
        <button className="OrderButton"
        disabled= {!props.purchaseable}
        onClick = {props.ordered}> ORDER NOW</button>
        </div>
    )
}

export default buildControls;