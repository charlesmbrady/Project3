import axios from "axios";

export default {
  // Gets all Drinks
  getDrinks: function() {
    return axios.get("/api/Drinks");
  },
  // Gets the Drink with the given id
  getDrink: function(id) {
    return axios.get("/api/Drinks/" + id);
  },
  // Deletes the Drink with the given id
  deleteDrink: function(id) {
    return axios.delete("/api/Drinks/" + id);
  },
  // Saves a Drink to the database
  saveDrink: function(DrinkData) {
    return axios.post("/api/Drinks", DrinkData);
  }
};
