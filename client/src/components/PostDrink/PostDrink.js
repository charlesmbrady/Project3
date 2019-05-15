import React from "react";
import './PostDrink.css';

const PostDrink = (props) => {
    //conditional styling for bac
    let msgdeco;
    if (props.bac > .08) {
        msgdeco = {
            color: "red",
            textAlign: "center",
            fontWeight: "bold"
        }
    } else {
        msgdeco = {
            color: "green",
            textAlign: "center",
            fontWeight: "bold"
        }
    }
    return (
        <div className="drink-display">
            { props.drinks.number > 0 ? (
                <div>
                    
                    <p style={ msgdeco }>Estimated BAC*: { props.bac } (Over 0.08 is  intoxicated)<br />
                        Hours for your BAC to get back to ZERO: { props.zero }</p>
                        <p className="drink-text">Drinks: { props.drinks.number }, Last added: { (props.drinks.timeOfLastDrink).toLocaleString() }</p>
                </div>
            ) : (
                    <p>No drinks yet!</p>
                ) }

        </div>
    );
};


export default PostDrink;