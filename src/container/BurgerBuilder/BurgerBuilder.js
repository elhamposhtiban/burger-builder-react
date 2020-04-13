import React, {Component} from "react";
import Burger from "../../components/Burger/Burger"

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 0,
            cheese: 1,
            meat: 0
        }
    }

    render() {
        return(
            <React.Fragment>
               <Burger ingredients= {this.state.ingredients}/>
                <div>Build controls</div>
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;