const router = require("express").Router();
const textController = require("../../controllers/textController");

// Matches with "/api/text"
router.route("/")
    .post(textController.sendText);

module.exports = router;