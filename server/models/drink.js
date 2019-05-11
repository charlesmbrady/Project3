const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  numberOfDrinks: { type: Number },
  bac: { type: Number },
  timeOfLastDrink: { type: Date},
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
