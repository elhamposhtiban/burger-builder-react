import React from "react";
import burgerLogo from "../../assets/images/original.png"
import "./Logo.css"

const Logo = (props) => {

    return (

        <div className = "Logo" 
        style = {{ height : props.height, marginBottom: props.marginBottom}}> 
        
          <img src = {burgerLogo} alt= "My Burger"/>
        </div>
    )
}

export default Logo;