const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '3f19d248',
    apiSecret: 'bQL32wG6XyjNY1OQ'
});

const from = '14086495624';

module.exports = {
    sendText: function (req, res) {
        nexmo.message.sendSms(
            from, req.body.to, req.body.message,
            (err, responseData) => {
                if (err) {
                    console.log('sendSms error: ' + err);
                    res.status(422).json(err);
                } else {
                    console.log('sendSms response: ' + responseData);
                    res.json(responseData);
                }
            }
        );
    }
};