import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TEXT from '../../utils/TEXT';
import MenuModal from '../../components/Menu';
import PostDrink from '../../components/PostDrink';
import './Home.css';
import API from "../../utils/API";
import colorSuperSip from '../../images/colorSuperSip.gif';
import AUTH from '../../utils/AUTH';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      numberOfDrinks: [ { number: 0, timeOfLastDrink: [ new Date().toLocaleString() ] } ],
      userPhoneNumber: 0,
      emergencyContactNumber: 0,
      password: '',
      isLoggedIn: false,
      weight: 130,
      gender: 'f',
      selfAlertThreshold: 1,
      emergencyAlertThreshold: 1,
      latitude: 0,
      longitude: 0,
      theCheckinLatitude: 0,
      theCheckinLongitude: 0,
      proximityAlertSent: false,
      emergencyNotificationSent: false,
      watchID: 0,
      bac: 0,
      zero: new Date().toLocaleString(),
      interval: "",
      alertsModal: false,
      phoneModal: false,
      settingsModal: false,
      modal: false,
      toggle () {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    };
  }

  //grab previous drink info from db
  loadDrinks = () => {
    AUTH.getUserDrinks({
      userPhoneNumber: this.state.userPhoneNumber
    }).then(res => {

      clearInterval(this.interval);
      let lastdrink = {};
      let numberOfDrinksCopy = this.state.numberOfDrinks;
      lastdrink.number = res.data.drinks[ (res.data.drinks.length) - 1 ].numberOfDrinks;
      lastdrink.timeOfLastDrink = (new Date(res.data.drinks[ (res.data.drinks.length) - 1 ].timeOfLastDrink)).toLocaleString();
      numberOfDrinksCopy.push(lastdrink);
      //elapsed time in minutes since last recorded drink
      let now = new Date();
      let elapsedTime = (now - new Date(lastdrink.timeOfLastDrink)) / 60000;
      let bac = (res.data.drinks[ (res.data.drinks.length) - 1 ].bac - (elapsedTime * .00025)).toFixed(5);
      if (bac < 0) { bac = 0; }
      //measure the time based on current bac for it to get to 0
      let counter = 0, baczero = bac;
      while (baczero > 0) {
        baczero = baczero - ((1 / 60) * .015);
        counter++;
      }
      let zero = (counter / 60).toFixed(2);

      this.setState({ numberOfDrinks: numberOfDrinksCopy, bac, zero });
      this.interval = setInterval(() => { this.updateBac.bind(this); this.updateBac(); }, 60000);
    })
      .catch(err => console.log(err));
  };

  componentDidMount () {
    this._isMounted = true;
    this.watchLocation();
    this.checkLocalStorageOnMount();
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  calculateBac (drink, time, weight) {
    //calculate BAC(using 130lbs as generic weight and r=0.55 for conservative estimate)
    let bac = ((drink * 14) / ((weight * 453.592) * 0.55)) * 100;
    //elapsed time 
    let first = (Date.parse(time)) / 3600000;
    let now = (Date.parse(new Date().toLocaleString())) / 3600000;
    let elapsedTime = now - first;
    bac = (bac - (elapsedTime * 0.015)).toFixed(5);
    return bac;
  }

  //update BAC every minute
  updateBac () {
    let bac = (this.state.bac - ((1 / 60) * .015)).toFixed(5);
    if (bac < 0) { bac = 0; }
    this.setState({ bac });
  }

  drinkTracker = (e) => {
    e.preventDefault();
    this.checkForNumbers();
    clearInterval(this.interval);
    let lastdrink = {};
    let numberOfDrinksCopy = this.state.numberOfDrinks;
    lastdrink.number = (numberOfDrinksCopy[ (numberOfDrinksCopy.length - 1) ].number) + 1;
    lastdrink.timeOfLastDrink = new Date().toLocaleString();
    numberOfDrinksCopy.push(lastdrink);
    let bac = (parseFloat(this.calculateBac(1, lastdrink.timeOfLastDrink, this.state.weight)) + parseFloat(this.state.bac)).toFixed(5);
    if (bac < 0) { bac = 0; }
    //measure the time based on current bac for it to get to 0
    let counter = 0, baczero = bac;
    while (baczero > 0) {
      baczero = baczero - ((1 / 60) * .015);
      counter++;
    }
    let zero = (counter / 60).toFixed(2);
    this.setState({ numberOfDrinks: numberOfDrinksCopy, bac, zero },
      () => this.checkBeforeSendAutomaticText());
    //push drinks to db
    if (this.state.userPhoneNumber !== 0) {
      API.saveDrink({
        userPhoneNumber: this.state.userPhoneNumber,
        numberOfDrinks: lastdrink.number,
        bac: bac,
        timeOfLastDrink: lastdrink.timeOfLastDrink,
        latitude: this.state.theCheckinLatitude,
        longitude: this.state.theCheckinLongitude
      }).then((result) => {
        console.log("drinks added");
      }).catch(err => console.log(err));
    }
    this.interval = setInterval(() => { this.updateBac.bind(this); this.updateBac(); }, 60000);
  };

  checkIn = (e) => {
    e.preventDefault();
    console.log("Check-In");
    this.checkForNumbers();
    this.storeCheckinLocation();
  };

  checkLocalStorageOnMount = () => {
    if (this.state.userPhoneNumber === 0) {
      let userPhoneNumber = localStorage.getItem("userPhoneNumber");
      let emergencyContactNumber = localStorage.getItem("emergencyContactNumber");
      if (userPhoneNumber !== null) {
        this.setState({ userPhoneNumber: userPhoneNumber }, () => { console.log("set userPhoneNumber from localStorage: " + this.state.userPhoneNumber); this.loadDrinks() });
      }
      if (emergencyContactNumber !== null) {
        this.setState({ emergencyContactNumber: emergencyContactNumber }, console.log("set emergencyContactNumber from localStorage: " + emergencyContactNumber));
      }
    }
  };

  checkForNumbers = (callback) => {
    if (this.state.userPhoneNumber === 0 || this.state.userPhoneNumber === null) {
      let userPhoneNumber = localStorage.getItem("userPhoneNumber");
      let emergencyContactNumber = localStorage.getItem("emergencyContactNumber");
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      // var password;
      console.log("numbers from localStorage - user: " + userPhoneNumber + ", emergency: " + emergencyContactNumber + ", isLoggedIn: " + isLoggedIn);
      if (userPhoneNumber === null) {
        this.togglePhone();
      } else {
        this.loadDrinks();
      }
    } else {
      if (typeof callback === "function") { callback() };
    }
  };

  storeCheckinLocation = () => {
    this.setState({ theCheckinLatitude: this.state.latitude, theCheckinLongitude: this.state.longitude, proximityAlertSent: false, emergencyNotificationSent: false }, this.watchLocation);
    document.getElementById("test-display").innerText = "Check-In location: " + this.state.latitude + ", " + this.state.longitude + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  };

  watchLocation = () => {
    const watchId = navigator.geolocation.watchPosition(this.checkLocation);
    this._isMounted && this.setState({ watchId });
  };

  checkLocation = (position) => {
    // if (this.state.latitude === 0) {
    this._isMounted && this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    // }
    if (this.state.theCheckinLatitude !== 0) {
      let theDifferenceLatitude = (Math.abs(position.coords.latitude - this.state.theCheckinLatitude)).toFixed(6);
      let theDifferenceLongitude = (Math.abs(position.coords.longitude - this.state.theCheckinLongitude)).toFixed(6);
      if (!this.state.proximityAlertSent) {
        if (theDifferenceLatitude > .0004 || theDifferenceLongitude > .0004) {
          document.getElementById("test-display").innerText = "MAJOR PROXIMITY CHANGE " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
          this.setState({ proximityAlertSent: true, theCheckinLatitude: 0, theCheckinLongitude: 0 });
          const theMessage = "It looks like you are leaving the spot where you checked in with sipSpot. Don't forget your credit card, jacket, friends, etc.! PLEASE NOTE: proximity alerts are now turned off until you Check-In again.";
          document.getElementById("test-display").innerText = "sending proximity alert to " + this.state.userPhoneNumber;
          this.sendAutomaticTextBasic(this.state.userPhoneNumber, theMessage);
        } else {
          document.getElementById("test-display").innerText = "minor proximity change " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        }
      }
    }
  };

  contactFriends = () => {
    this.checkForNumbers(this.sendText);
  };

  sendText = () => {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
      // Android phones require a shortened URL because they
      // can't handle the ampersand in the Google Maps link
      const theUrl = `https://www.google.com/maps/dir/?api=1%26destination=${this.state.latitude},${this.state.longitude}`;
      API.shortenUrl({
        URL: theUrl
      }).then((result) => {
        const theMessageString = "sms:;?&body=" + encodeURIComponent("Come meet me out on the town! This link was generated by sipSpot: " + result.data.shorturl);
        window.open(theMessageString, "_self");
        return false;
      }).catch(err => console.log(err));
    } else { // iOS can handle the ampersand without modification
      const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`;
      const theMessageString = "sms:;?&body=" + encodeURIComponent("Come meet me out on the town! This link was generated by sipSpot: " + theUrl);
      window.open(theMessageString, "_self");
      return false;
    }
  };

  checkBeforeSendAutomaticText = () => {
    if (this.state.bac > 0.1 && this.state.emergencyNotificationSent === false) {
      console.log("Sending emergency text to " + this.state.emergencyContactNumber);
      this.sendAutomaticText();
    }
  };

  sendAutomaticTextBasic = (toNumber, theMessage) => {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid && toNumber === this.state.userPhoneNumber) {
      if (theMessage.indexOf("Uber") > -1) { // this removes the Uber link
        theMessage = "It looks like you have had a lot to drink. Please get a ride home or get an Uber, for your own safety and for the safety of others."
      }
      window.navigator.vibrate([ 500, 200, 500 ]);
      setTimeout(function () {
        alert(theMessage);
      }, 800);
      document.getElementById("test-display").innerText = "Alerted message locally: " + theMessage;
    } else {
      TEXT.sendText({ to: toNumber, message: theMessage })
        .then(res => {
          document.getElementById("test-display").innerText = "AUTOMATIC text message sent: " + res.message;
          console.log("AUTOMATIC text message sent, response:");
          console.log(res.message);
        })
        .catch(err => {
          document.getElementById("test-display").innerText = "automatic text sending error: " + err.message;
          console.log(err)
        });
    }
  };

  sendAutomaticText = () => {
    this.setState({ emergencyNotificationSent: true });
    let theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`;
    let theMessage = "Please come give me a ride; I have had too much to drink. Here is a Google Maps link to my location. (This message *auto-generated* by sipSpot) " + theUrl;
    if (this.state.emergencyContactNumber === this.state.userPhoneNumber) {
      theUrl = "https://m.uber.com/ul/?action=setPickup&pickup=my_location"
      theMessage = "It looks like you have had a lot to drink. Please get a ride home or get an Uber, for your own safety and for the safety of others. Here's a link to Uber: (This message *auto-generated* by sipSpot) " + theUrl;
    }
    let theNumber;
    if (this.state.emergencyContactNumber === 0 || this.state.emergencyContactNumber === null) {
      theNumber = this.state.userPhoneNumber;
    } else {
      theNumber = this.state.emergencyContactNumber;
    }
    this.sendAutomaticTextBasic(theNumber, theMessage);
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [ name ]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    //toggles off the respective modal
    event.preventDefault();
    if (this.state.settingsModal) {
      this.toggleSettings();
      // TODO: @Marcia, this is where we need to update db from state. The settings
      // values are already in state because they've been updated by handleInputChange.
      // just update weight, gender, and phone numbers if there are valid values in
      // those states.
      console.log("update db with this.state");
      console.log(this.state);
      AUTH.userUpdate({
        userPhoneNumber: this.state.userPhoneNumber,
        emergencyContactNumber: this.state.emergencyContactNumber,
        weight: this.state.weight,
        gender: this.state.gender
      }).then(response => {
        console.log("user info updated");
      });
    }
    if (this.state.phoneModal) {
      localStorage.setItem("userPhoneNumber", this.state.userPhoneNumber);
      localStorage.setItem("emergencyContactNumber", this.state.emergencyContactNumber);
      localStorage.setItem("isLoggedIn", true);
      this.setState({ isLoggedIn: true });
      AUTH.signup({
        userPhoneNumber: this.state.userPhoneNumber,
        emergencyContactNumber: this.state.emergencyContactNumber,
        password: this.state.password
      }).then(response => {
        console.log("user: " + this.state.userPhoneNumber + ", emerg: " + this.state.emergencyContactNumber + ", pass: " + this.state.password);
        if (response.data.error !== 'Phone number exists' && response.data.error !== 'Password does not match') {
          console.log('youre registered');
          this.setState({
            redirectTo: '/'
          });
        }else if(response.data.error === 'Phone number exists'){
          console.log('duplicate');
          this.loadDrinks();
        }else if(response.data.error === 'Password does not match'){
          console.log('wrong password');
          alert("Password does not match, Please enter the right password");
          this.setState({userPhoneNumber: 0, emergencyContactNumber: 0});
          localStorage.clear();
        }
      });
      this.togglePhone();
    }
    if (this.state.alertsModal) {
      this.toggleAlerts();
    }
  };

  toggleAlerts = () => {
    this.setState(prevState => ({
      alertsModal: !prevState.alertsModal
    }));
  }

  toggleSettings = () => {
    console.log('this too')
    this.setState(prevState => ({
      settingsModal: !prevState.settingsModal
    }));
  }

  togglePhone = () => {
    this.setState(prevState => ({
      phoneModal: !prevState.phoneModal
    }))
  }

  render () {
    return (
      <div>
        <div className="topbar">
          <MenuModal user={ this.state.firstName } modal={ this.state.modal } toggle={ this.state.toggle.bind(this) } toggleAlerts={ this.toggleAlerts } toggleSettings={ this.toggleSettings }></MenuModal><a className="cntrl-btn" data-test="menu-quickstart" href="/quickstart">Quick Start</a>
        </div>
        <Container className="home">
          <MenuModal user={ this.state.firstName } modal={ this.state.modal } toggle={ this.state.toggle.bind(this) } toggleAlerts={ this.toggleAlerts } toggleSettings={ this.toggleSettings }></MenuModal>
          <Row>
            <Col>
              <div id="title">sipSpot</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="test-display">test display</div>
              <PostDrink drinks={ this.state.numberOfDrinks[ ((this.state.numberOfDrinks).length) - 1 ] } bac={ this.state.bac } zero={ this.state.zero }></PostDrink>
              <div>
                <img id="superSip" src={ colorSuperSip } alt="super sip the beer bottle" width="80%" />
              </div>
            </Col>
          </Row>
        </Container>
        <div className="bottombar">
          <button className="cntrl-btn" data-test="controls-checkin" onClick={ this.checkIn }>Chk</button>
          <button className="cntrl-btn" data-test="controls-drink" onClick={ this.drinkTracker }>Drnk</button>
          <a className="cntrl-btn" data-test="controls-uber" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location" target="_blank" rel="noopener noreferrer">Uber</a>
          <button className="cntrl-btn" data-test="controls-friends" onClick={ this.contactFriends }>Frnd</button>
        </div>
        {/* Alerts Modal */ }
        <Modal isOpen={ this.state.alertsModal } toggleAlerts={ this.toggleAlerts } className="alerts">
          <ModalHeader toggle={ this.toggleAlerts }>
          </ModalHeader>
          <ModalBody className="modal-body">
            <Container>
              <h2 className="alerts-label">Alerts</h2>
              <form onSubmit={ this.handleFormSubmit }>
                <div className="form-group">
                  <label className="form-check-label alerts-label">BAC Emergency Alert Threshold</label>
                  <input
                    onChange={ this.handleInputChange }
                    value={ this.state.emergencyAlertThreshold }
                    name="emergencyAlertThreshold"
                    type="number" className="form-control" id="settings-bac-threshold" placeholder="Ex. .08"></input>
                </div>
                <div className="form-group">
                  <label className="alerts-label">BAC Self Alert Threshold</label>
                  <input type="number"
                    onChange={ this.handleInputChange }
                    value={ this.state.selfAlertThreshold }
                    name="selfAlertThreshold"
                    className="form-control" id="drinkCountThreshold" placeholder="Ex. 5"></input>
                </div>
                <button type="submit" className="btn">Submit</button>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="secondary" onClick={ props.toggle }>Close</Button> */ }
          </ModalFooter>
        </Modal>
        {/* Settings Modal */ }
        <Modal isOpen={ this.state.settingsModal } toggleSettings={ this.toggleSettings } className="settings">
          <ModalHeader toggle={ this.toggleSettings }>
          </ModalHeader>
          <ModalBody className="modal-body">
            <Container>
              <p>Settings: Enter your weight and gender below to more-accurately calculate Blood Alcohol Concentration (BAC). You can also optionally change your phone number, emergency contact number, and password here.</p>
              <form onSubmit={ this.handleFormSubmit }>
                {/* <div className="form-group "> */ }
                <label className="form-check-label settings-label" for="settings-weight">Weight in pounds:</label>
                <input type="number"
                  onChange={ this.handleInputChange }
                  value={ this.state.weight }
                  name="weight"
                  className="form-control" id="settings-weight" placeholder="Ex. 130"></input>
                {/* </div>
                <div className="form-group"> */}
                <label className="settings-label">Gender:</label>
                {/* TODO: need to make this so only one gender can be selected */ }
                <div className="form-group">
                  <div className="form-check form-check-inline">

                    <input className="form-check-input"
                      onChange={ this.handleInputChange }
                      name="gender"
                      type="checkbox" id="inputeGenderMale" value="m"></input>
                    <label className="form-check-label settings-label" for="inlineCheckbox1">M</label>
                  </div>
                </div>
                {/* </div>
                <div className="form-check form-check-inline"> */}
                <input className="form-check-input"
                  onChange={ this.handleInputChange }
                  name="gender"
                  type="checkbox" id="inputGenderFemale" value="f"></input>
                <label className="form-check-label settings-label" for="inlineCheckbox2">F</label>
                {/* </div>
                <div className="form-group"> */}
                <div />
                <label className="form-check-label settings-label" for="settings-user-phone-number">Phone Number</label>
                <input
                  value={ this.state.userPhoneNumber === 0 ? "" : this.state.userPhoneNumber }
                  onChange={ this.handleInputChange }
                  type="number"
                  name="userPhoneNumber"
                  className="form-control" id="settings-user-phone-number" placeholder="9195551212"></input>
                {/* </div>
                <div className="form-group"> */}
                <label className="form-check-label settings-label" for="emergencyContactPhoneNumber">Emergency Contact Number:</label>
                <input type="number"
                  value={ this.state.emergencyContactNumber === 0 ? "" : this.state.emergencyContactNumber }
                  onChange={ this.handleInputChange }
                  name="emergencyContactNumber"
                  className="form-control" id="emergencyContactPhoneNumber" placeholder=""></input>
                {/* </div> */ }
                <button type="submit" className="btn">Submit</button>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="secondary" onClick={ props.toggle }>Close</Button> */ }
          </ModalFooter>
        </Modal>
        {/* Phone Modal */ }
        <Modal isOpen={ this.state.phoneModal } togglePhone={ this.togglePhone } className="settings">
          <ModalHeader toggle={ this.togglePhone }>
          </ModalHeader>
          <ModalBody className="modal-body">
            <Container>
              <p>Spot just needs two or three bits of info to help you. Your phone number so he can send you alerts (required), an optional emergency contact number so he can send them directions to your location if you're overdoing it, and a password so he can keep your information private (required).</p>
              <form onSubmit={ this.handleFormSubmit }>
                <div className="form-group">
                  <label className="form-check-label settings-label" for="settings-user-phone-number">Phone Number:</label>
                  <input
                    value={ this.state.userPhoneNumber === 0 ? "" : this.state.userPhoneNumber }
                    onChange={ this.handleInputChange }
                    type="number"
                    name="userPhoneNumber"
                    className="form-control" id="settings-user-phone-number" placeholder="9195551212"></input><br />
                  <label className="form-check-label settings-label" for="settings-emergency-contact-number">Emergency Contact Number (optional):</label>
                  <input
                    value={ this.state.emergencyContactNumber === 0 ? "" : this.state.emergencyContactNumber }
                    onChange={ this.handleInputChange }
                    type="number"
                    name="emergencyContactNumber"
                    className="form-control" id="settings-emergency-contact-number" placeholder="9195551212"></input><br />
                  <label className="form-check-label settings-label" for="settings-password">Password:</label>
                  <input
                    value={ this.state.password }
                    onChange={ this.handleInputChange }
                    type="text"
                    name="password"
                    className="form-control" id="settings-password" placeholder=""></input>
                </div>
                <button type="submit" className="btn">Submit</button>
              </form>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Home;