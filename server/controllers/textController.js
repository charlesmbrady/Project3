require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const from = process.env.from;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    sendText: function (req, res) {
        client.messages
            .create({
                body: req.body.message,
                from: from,
                to: req.body.to
            })
            .then(message => {
                console.log(message.sid);
                res.json(message.sid);
            });
    }
};