const router = require("express").Router();
const drinkRoutes = require("./drinks");
const textRoutes = require("./text");

// drink routes
router.use("/drinks", drinkRoutes);

// text routes
router.use("/text", textRoutes);

module.exports = router;