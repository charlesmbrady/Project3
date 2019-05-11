/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import HomeButton from '../../components/HomeButton/HomeButton';
import './Settings.css';

function Settings() {

  return (
    <div>
      <HomeButton />
      <h2 className="settings-label">Settings</h2>
      <form>
        <div className="form-group">
          <label className="form-check-label settings-label" for="exampleInputEmail1">Weight (lbs)</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ex. 130"></input>
        </div>
        <div className="form-group">
          <label className="settings-label">Gender:</label>
          <div className="form-group">
            <div className="form-check form-check-inline">

              <input className="form-check-input settings-label" type="checkbox" id="inputeGenderMale" value="male"></input>
              <label className="form-check-label settings-label" for="inlineCheckbox1">M</label>
            </div>
          </div>
        </div>



        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inputGenderFemale" value="female"></input>
          <label className="form-check-label settings-label" for="inlineCheckbox2">F</label>
        </div>

        <div className="form-group">
          <label className="form-check-label settings-label" for="inputPhoneNumber">Phone Number</label>
          <input type="email" className="form-control" id="inputPhoneNumber" aria-describedby="emailHelp" placeholder="2522551122"></input>
        </div>

        <div className="form-group">
          <label className="form-check-label settings-label" for="emergencyContactPhoneNumber">Emergency Contact Phone Number</label>
          <input type="email" className="form-control" id="emergencyContactPhoneNumber" aria-describedby="emailHelp" placeholder="2522020784"></input>
        </div>


        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}


export default Settings;
