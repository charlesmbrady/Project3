import React from "react";
import './PostDrink.css';

const PostDrink = (props) => {
    return ( 
        <div className="drinkbox">
            <h1 style={{color:"green"}}>Drink Tracker</h1>
            {props.drinks.numberOfDrinks>0 ? (
                <div>
                    <p className="drinktext">Number of drinks: {props.drinks.numberOfDrinks}<br/>
                    Time of last drink: {(props.drinks.timeOfLastDrink).toLocaleString()}</p>
                </div>
            ) : (
                <h3 style={{color:"blue"}}>No drinks yet!</h3>
            )}

        </div>
    );
};


export default PostDrink;