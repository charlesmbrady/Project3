import React from "react";
import './PostDrink.css';

const PostDrink = (props) => {
    //conditional styling for bac
    let msgdeco;
    if (props.bac > .08) {
        msgdeco = {
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundImage: 'linear-gradient( to right, #dcbfff, yellow)',
            textShadow: "none"
            }
    } else {
        msgdeco = {
            color: "green",
            textAlign: "center",
            fontWeight: "bold",
            backgroundImage: 'linear-gradient( to right, #dcbfff, lightGreen)',
            borderRadius: "10px",
            textShadow: "none"
        }
    }

    return (
        <div className="drink-display">
            { props.bac >= 0.005 ? (
                <div>

                    <p style={ msgdeco }>Estimated BAC*: { props.bac }<br />(0.08 is  intoxicated)<br />
                        Hours until BAC is ZERO: { props.zero }<br />Last drink at: { (props.drinks.timeOfLastDrink).toLocaleString() }</p>
                </div>
            ) : (
                    <p>No drinks yet!</p>
                ) }

        </div>
    );
};


export default PostDrink;