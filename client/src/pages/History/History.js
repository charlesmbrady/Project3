/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import HomeButton from '../../components/HomeButton/HomeButton';
import './History.css';

function History() {

  return (
    <div>
    <HomeButton />
    <h1 class="h1-text-color">Drink History</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Day:</th>
          <th scope="col">Date:</th>
          <th scope="col"># of Drinks:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Friday</th>
          <td>5-10-2019</td>
          <td>1</td>
        </tr>
        <tr>
          <th scope="row">Saturday</th>
          <td>5-11-2019</td>
          <td>2</td>
        </tr>
        <tr>
          <th scope="row">Sunday</th>
          <td>5-12-2019</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}


export default History;
