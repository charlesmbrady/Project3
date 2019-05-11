/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import HomeButton from '../../components/HomeButton/HomeButton';
import './style.css';

function Alerts() {

    return (
        <div>
            <HomeButton />
            <h2>Alerts</h2>
            <form>
                <div className="form-group">
                    <label className="form-check-label" for="exampleInputEmail1">BAC Alert Threshold</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ex. .08"></input>

                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Location Alert Threshold Distance (ft)</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ex. 200"></input>
                </div>

                <div className="form-group">
                    <label for="drinkCountThreshold">Drink Count Alert Threshold</label>
                    <input type="password" className="form-control" id="drinkCountThreshold" placeholder="Ex. 5"></input>
                </div>

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}


export default Alerts;
