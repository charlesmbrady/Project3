const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  numberOfDrinks: { type: Number },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
