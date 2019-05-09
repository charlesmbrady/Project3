const router = require("express").Router();
const drinkRoutes = require("./drinks");

// drink routes
router.use("/drinks", drinkRoutes);

module.exports = router;