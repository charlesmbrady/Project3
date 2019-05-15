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
                    <p className="drink-text">Drinks added: { props.drinks.number }<br />
                        Last drink added: { (props.drinks.timeOfLastDrink).toLocaleString() }<br /></p>
                    <p style={ msgdeco }>Your Blood Alcohol Concentration(BAC): { props.bac }<br />
                        (Over 0.08 is legally intoxicated in most places)<br />
                        Hours for your BAC to get back to ZERO: { props.zero }</p>

                </div>
            ) : (
                    <p>No drinks yet!</p>
                ) }

        </div>
    );
};


export default PostDrink;