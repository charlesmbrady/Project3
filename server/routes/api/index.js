const router = require("express").Router();
const drinkRoutes = require("./drinks");
const textRoutes = require("./text");
const shortenUrl = require("./shortenUrl");

// drink routes
router.use("/drinks", drinkRoutes);

// text routes
router.use("/text", textRoutes);

// shorten URL routes
router.use("/shortenurl", shortenUrl);

module.exports = router;