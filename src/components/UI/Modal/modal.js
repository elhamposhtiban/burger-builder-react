import React, {Component} from "react";
import "./modal.css";
import Backdrop from "../Backdrop/backdrop"


const Modal = (props)=> {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (nextProps.show !== this.props.show ||
    //          nextProps.children !== this.props.children)
    // }

    return (
    <React.Fragment>
    <Backdrop show= {props.show} clicked = {props.modalClosed}/>
    <div className = "Modal"
    style = {{
        transform: props.show ? "translateY(0)" : "translateY 100vh",
        opacity : props.show? "1" : "0"
    }}>
        {props.children}
    </div>
    </React.Fragment>
    )

} 

export default React.memo(Modal, (prevProps, nextProps) => 
{return (nextProps.show === prevProps.show &&
          nextProps.children === prevProps.children)});