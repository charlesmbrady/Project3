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
    // console.log('last: ' + props.drinks.timeOfLastDrink);
    // console.log('zero: ' + props.zero);
    let deltaSinceLastDrink = Math.abs(Date.parse(props.drinks.timeOfLastDrink) - Date.now());
    // console.log('delta: ' + deltaSinceLastDrink);
    let minutes = Math.floor((deltaSinceLastDrink / (1000 * 60)) % 60);
    let hours = Math.floor((deltaSinceLastDrink / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    // console.log('delta in hours/decimal mins: ' + hours + "." + parseInt(minutes / 0.6));
    let hoursSinceLastDrink = hours + "." + parseInt(minutes / 0.6, 10);
    let backToZero = props.zero - hoursSinceLastDrink
    if (backToZero < 0) { backToZero = 0 };
    // console.log('back-to-zero: ' + backToZero);

    return (
        <div className="drink-display">
            { props.drinks.number > 0 ? (
                <div>

                    <p style={ msgdeco }>Last est. BAC*: { props.bac } (0.08 is  intoxicated)<br />
                        Hours until BAC returns to ZERO: { backToZero }</p>
                    <p className="drink-text">Drinks: { props.drinks.number }, Last added: { (props.drinks.timeOfLastDrink).toLocaleString() }</p>
                </div>
            ) : (
                    <p>No drinks yet!</p>
                ) }

        </div>
    );
};


export default PostDrink;