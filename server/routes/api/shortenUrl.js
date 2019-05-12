const router = require("express").Router();
const shortenUrlController = require("../../controllers/shortenUrlController");

// Matches with "/api/shortenUrl"
router.route("/")
    .post(shortenUrlController.shortenUrl);

module.exports = router;