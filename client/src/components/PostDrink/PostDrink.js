import React from "react";
import './PostDrink.css';

const PostDrink = (props) => {
    return ( 
        <div className="drink-display">
            <h3>Drink Tracker</h3>
            {props.drinks.numberOfDrinks>0 ? (
                <div>
                    <p className="drink-text">Number of drinks: {props.drinks.numberOfDrinks}<br/>
                    Time of last drink: {(props.drinks.timeOfLastDrink).toLocaleString()}</p>
                </div>
            ) : (
                <p>No drinks yet!</p>
            )}

        </div>
    );
};


export default PostDrink;