/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import HomeButton from '../../components/HomeButton/HomeButton';
import './History.css';
import Axios from 'axios';

function History() {
 
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    Axios.get( (drinksapi) => {
      //api call that gives us drinks data as a response
    }).then((data) => {
      setDrinks(data);
    })
  }, []);

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
      {drinks.map(drink => (
        <tr>
          <td>{drink.day}</td>
          <td>{drink.date}</td>
          <td>{drink.drinkCount}</td>
        </tr>))}
      </tbody>
    </table>
    </div>
  );
}


export default History;
