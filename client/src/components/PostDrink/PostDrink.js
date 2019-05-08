import React from "react";
import './PostDrink.css';

const PostDrink = (props) => {
    //conditional styling for bac
    let msgdeco;
    if(props.bac>.08){
        msgdeco= {
            color: "red",
            textAlign: "center",
            fontWeight: "bold"
          }
    }else{
        msgdeco= {
            color: "green",
            textAlign: "center",
            fontWeight: "bold"
          }
    }
    return ( 
        <div className="drink-display">
            <h3>Drink Tracker</h3>
            {props.drinks.number>0 ? (
                <div>
                    <p className="drink-text">Number of drinks: {props.drinks.number}<br/>
                    Time of last drink: {(props.drinks.timeOfLastDrink).toLocaleString()}<br/></p>
                    <p style={msgdeco}>Your Blood Alcohol Concentration: {props.bac}<br/>(Anything over 0.08 is considered legally intoxicated)</p>

                </div>
            ) : (
                <p>No drinks yet!</p>
            )}

        </div>
    );
};


export default PostDrink;