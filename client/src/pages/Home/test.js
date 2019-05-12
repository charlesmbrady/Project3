TEXT.sendText({ to: this.state.userPhoneNumber, message: theMessage })
    .then(res => {
        document.getElementById("test-display").innerText = "PROXIMITY ALERT SENT: " + res.message;
        console.log("proximity alert sent, response:");
        console.log(res.message);
    })
    .catch(err => {
        document.getElementById("test-display").innerText = "proximty alert sending error: " + err.message;
        console.log(err)
    })


TEXT.sendText({ to: this.state.emergencyContactNumber, message: theMessage })
    .then(res => {
        document.getElementById("test-display").innerText = "AUTOMATIC text message sent: " + res.message;
        console.log("AUTOMATIC text message sent, response:");
        console.log(res.message);
    })
    .catch(err => {
        document.getElementById("test-display").innerText = "automatic text sending error: " + err.message;
        console.log(err)
    });
