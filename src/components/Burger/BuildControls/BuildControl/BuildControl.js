import React from "react";
import "./BuildControl.css";

const buildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className = "Label"> {props.label}</div>
            <button className="More" 
            onClick = {props.addIngredientHandler}
            disabled = {props.disabledInfo}>
            More</button>
            <button className="Less" 
            onClick = {props.removeIngredientHandler}
            disabled= {props.disabledInfo}>
            Less</button>
        </div>

    )
}

export default buildControl;