// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC506559edcf3eae25102c0c2774bec0b8';
const authToken = 'ebe2f6c2d3a76d75cc94a47c4041c32b';
const client = require('twilio')(accountSid, authToken);

module.exports = {
    sendText: function (req, res) {
        client.messages
            .create({
                body: req.body.message,
                from: '+19195253167',
                to: req.body.to
            })
            .then(message => console.log(message.sid));
    }
};