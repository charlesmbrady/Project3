const axios = require('axios');

module.exports = {
    shortenUrl: function (req, res) {
        theUrlToShorten = req.body.URL;
        theRandomNumber = Date.now() + Math.floor(1000 + Math.random() * 9000);
        const theShortenerUrl = `https://is.gd/create.php?format=json&url=${theUrlToShorten}&shorturl=${theRandomNumber}sipspot`;
        axios.post(theShortenerUrl)
            .then(function (response) {
                // handle success
                console.log(response.data);
                res.json(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
};