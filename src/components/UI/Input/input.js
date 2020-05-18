import React from "react";
import  "./input.css"

const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {

        case ("input") :

    //we are going to check with ternary statement to see if the input is invalid or not
    props.invalid && props.touched? 
        inputElement = 
        <input className="inputElement Invalid" {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/> :

        inputElement = 
        <input className="inputElement" {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>

            break;
        case("textarea") :

        props.invalid && props.touched? 

            inputElement = 
            <textarea className="inputElement Invalid" {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/> :

            inputElement = 
            <textarea className="inputElement" {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/> 

            break;

        case("select") :
        

            inputElement = (
            <select className="inputElement"
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => 
                        (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                        ))}
            </select>)

            break;

            default : 
            inputElement = 
            <input className="inputElement" {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>

    }
return(
    <div className="Input">
        <label className="label">{props.label}</label>
        {inputElement}
    </div>
)
}

export default input;