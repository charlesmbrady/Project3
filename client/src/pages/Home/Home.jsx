import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import TEXT from '../../utils/TEXT';
import MenuModal from '../../components/Menu';
import PostDrink from '../../components/PostDrink';
import './Home.css';
import API from "../../utils/API";
import AlertsModal from '../../components/AlertsModal/AlertsModal';
import SettingsModal from '../../components/SettingsModal/SettingsModal';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: props,
      numberOfDrinks: [ { number: 0, timeOfLastDrink: [ new Date().toLocaleString() ] } ],
      userPhoneNumber: 0,
      emergencyContactNumber: 0,
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
      settingsModal: false,
      modal: false,
      toggle () {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    };
  }

  componentDidMount () {
    this._isMounted = true;
    this._isMounted && this.watchLocation();
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
    let bac=(this.state.bac-((1/60)*.015)).toFixed(5);
    if (bac<0) {bac=0;}
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
    let bac = (parseFloat(this.calculateBac(1, lastdrink.timeOfLastDrink, this.state.weight))+parseFloat(this.state.bac)).toFixed(5);
    
    //measure the time based on current bac for it to get to 0
    let counter=0,baczero=bac;
    while(baczero>0){
      baczero=baczero-((1/60)*.015);
      counter++;
    }

    let zero=(counter/60).toFixed(2);
    this.setState({ numberOfDrinks: numberOfDrinksCopy, bac, zero},
      () => this.checkBeforeSendAutomaticText());
      
    //push drinks to db
    if("user" in this.state.user){
      API.saveDrink({
        numberOfDrinks: lastdrink.number,
        bac: bac,
        timeOfLastDrink: lastdrink.timeOfLastDrink,
        latitude: this.state.theCheckinLatitude,
        longitude: this.state.theCheckinLongitude
      }).then((result) => {
        console.log("drinks added");
      }).catch(err => console.log(err));
    }

    this.interval=setInterval(() => { this.updateBac.bind(this); this.updateBac(); }, 60000);
  };



  checkIn = (e) => {
    e.preventDefault();
    console.log("Check-In");
    this.checkForNumbers();
    this.storeCheckinLocation();
  };

  checkForNumbers = (callback) => {
    if (this.state.userPhoneNumber === 0) {
      let userPhoneNumber = localStorage.getItem("userPhoneNumber");
      let emergencyContactNumber = localStorage.getItem("emergencyContactNumber");
      console.log(userPhoneNumber, emergencyContactNumber);
      if (userPhoneNumber === null) {
        userPhoneNumber = prompt("Please enter your phone number so sipSpot can send you alerts. sipSpot will never share your number with anyone else, ever.");
      }
      if (emergencyContactNumber === null) {
        emergencyContactNumber = prompt("Now please enter the phone number of an emergency contact in case you need to be picked up. This is OPTIONAL, but it's a really good idea to do.")
      }
      if (emergencyContactNumber === null || emergencyContactNumber === "") {
        emergencyContactNumber = userPhoneNumber;
      }
      localStorage.setItem("userPhoneNumber", userPhoneNumber);
      localStorage.setItem("emergencyContactNumber", emergencyContactNumber);
      this.setState({ userPhoneNumber: userPhoneNumber, emergencyContactNumber: emergencyContactNumber }, callback);
    }
  }

  storeCheckinLocation = () => {
    this.setState({ theCheckinLatitude: this.state.latitude, theCheckinLongitude: this.state.longitude, proximityAlertSent: false, emergencyNotificationSent: false }, this.watchLocation);
    document.getElementById("test-display").innerText = "Check-In location: " + this.state.latitude + ", " + this.state.longitude + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  }

  watchLocation = () => {
    const watchId = navigator.geolocation.watchPosition(this.checkLocation);
    this.setState({ watchId });
  }

  checkLocation = (position) => {
    // if (this.state.latitude === 0) {
    this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    // }
    if (this.state.theCheckinLatitude !== 0) {
      let theDifferenceLatitude = (Math.abs(position.coords.latitude - this.state.theCheckinLatitude)).toFixed(6);
      let theDifferenceLongitude = (Math.abs(position.coords.longitude - this.state.theCheckinLongitude)).toFixed(6);

      if (!this.state.proximityAlertSent) {
        if (theDifferenceLatitude > .0004 || theDifferenceLongitude > .0004) {
          document.getElementById("test-display").innerText = "MAJOR PROXIMITY CHANGE " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
          this.setState({ proximityAlertSent: true, theCheckinLatitude: 0, theCheckinLongitude: 0 });
          const theMessage = "It looks like you are leaving the spot where you checked in with sipSpot. Don't forget your credit card, jacket, friends, etc.! PLEASE NOTE: proximity alerts are now turned off until you Check-In again.";
          TEXT.sendText({ to: this.state.userPhoneNumber, message: theMessage })
            .then(res => {
              console.log("proximity alert sent, response:");
              console.log(res);
            })
            .catch(err => console.log(err))
        } else {
          document.getElementById("test-display").innerText = "minor proximity change " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        }
      }
    }
  }

  contactFriends = () => {
    this.checkForNumbers(this.sendText);
  }

  sendText = () => {
    const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`
    const theMessageString = "sms:" + this.state.userPhoneNumber + ";?&body=" + encodeURIComponent("Come meet me out on the town! This link was generated by sipSpot: " + theUrl);
    window.open(theMessageString, "_self");
    return false;
  }

  checkBeforeSendAutomaticText = () => {
    if (this.state.bac > 0.1 && this.state.emergencyNotificationSent === false) {
      console.log("Sending emergency text to " + this.state.emergencyContactNumber);
      this.sendAutomaticText();
    }
  }

  sendAutomaticText = () => {
    this.setState({ emergencyNotificationSent: true });
    let theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`;
    let theMessage = "Please come give me a ride; I have had too much to drink. Here is a Google Maps link to my location. (This message *auto-generated* by sipSpot) " + theUrl;
    if (this.state.emergencyContactNumber === this.state.userPhoneNumber) {
      theUrl = "https://m.uber.com/ul/?action=setPickup&pickup=my_location"
      theMessage = "It looks like you have had a lot to drink. Please get a ride home or get an Uber, for your own safety and for the safety of others. Here's a link to Uber: (This message *auto-generated* by sipSpot) " + theUrl;
    }
    TEXT.sendText({ to: this.state.emergencyContactNumber, message: theMessage })
      .then(res => {
        console.log("AUTOMATIC text message sent, response:");
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  toggleAlerts = () => {
    this.setState(prevState => ({
      alertsModal: !prevState.alertsModal
    }));
  }

  toggleSettings = () => {
    this.setState(prevState => ({
      settingsModal: !prevState.settingsModal
    }));
  }

  render () {
    return (
      <div>
        <Container className="home">
          <MenuModal user={ this.props.user } logout={ this.props.logout } modal={ this.state.modal } toggle={ this.state.toggle.bind(this) } toggleAlerts={ this.toggleAlerts } toggleSettings={ this.toggleSettings }></MenuModal>
          <Row>
            <Col>
              <div id="title">sipSpot</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="test-display">test display</div>
              <PostDrink drinks={ this.state.numberOfDrinks[ ((this.state.numberOfDrinks).length) - 1 ] } bac={ this.state.bac } zero={ this.state.zero }></PostDrink>
            </Col>
          </Row>
        </Container>
        <Container className="controls-container">
          <Row>
            <Col>
              <Button className="cntrl-btn" data-test="controls-checkin" onClick={ this.checkIn }>Check-In/Out</Button>
            </Col>
            <Col>
              <Button className="cntrl-btn" data-test="controls-drink" onClick={ this.drinkTracker }>Add Drink to Count</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button className="cntrl-btn" data-test="controls-uber" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location" target="_blank">Get an Uber</Button>
            </Col>
            <Col>
              <Button className="cntrl-btn" data-test="controls-friends" onClick={ this.contactFriends }>Contact Friends</Button>
            </Col>
          </Row>
        </Container>
        <AlertsModal alertsModal={ this.state.alertsModal } toggleAlerts={ this.toggleAlerts } />
        <SettingsModal settingsModal={ this.state.settingsModal } toggleSettings={ this.toggleSettings } />
      </div>
    );
  }
}

export default Home;
