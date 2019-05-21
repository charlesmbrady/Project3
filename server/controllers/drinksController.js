const db = require("../models");

// Defining methods for the drinksController
module.exports = {
  findAll: function (req, res) {
    db.Drink
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Drink
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let drink = {
      numberOfDrinks: req.body.numberOfDrinks,
      bac: req.body.bac,
      timeOfLastDrink: req.body.timeOfLastDrink,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };
    db.Drink
      .create(drink)
      .then(dbModel => {
        return db.User.findOneAndUpdate({ userPhoneNumber: req.body.userPhoneNumber }, { $push: { drinks: dbModel._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Drink
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Drink
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
