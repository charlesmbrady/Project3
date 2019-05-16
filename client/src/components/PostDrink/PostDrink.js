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
                    <p style={ msgdeco }>Last estimated BAC*: { props.bac }<br />(0.08 is intoxicated)<br />Hours until BAC is ZERO: { props.zero }<br />{ props.drinks.number } drink(s) as of: { (props.drinks.timeOfLastDrink).toLocaleString() }</p>
                </div>
            ) : (
                    <p>No drinks yet!</p>
                ) }

        </div>
    );
};


export default PostDrink;