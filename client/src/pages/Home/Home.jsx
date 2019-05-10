import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import TEXT from '../../utils/TEXT';
import MenuModal from '../../components/Menu';
import PostDrink from '../../components/PostDrink';
import './Home.css';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      numberOfDrinks: [ { number: 0, timeOfLastDrink: [ new Date().toLocaleString() ] } ],
      location: "",
      userPhoneNumber: 0,
      emergencyContactNumber: 0,
      latitude: 0,
      longitude: 0,
      theCheckinLatitude: 0,
      theCheckinLongitude: 0,
      proximityAlertSent: false,
      emergencyNotificationSent: false,
      watchID: 0,
      bac: 0,
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

  calculateBac (drink, time) {

    //calculate BAC(using 130lbs as generic weight and r=0.55 for conservative estimate)
    let bac = ((drink * 14) / (58967 * 0.55)) * 100;

    //elapsed time 
    let first = (Date.parse(time)) / 3600000;
    let now = (Date.parse(new Date().toLocaleString())) / 3600000;
    let elapsedTime = now - first;
    bac = (bac - (elapsedTime * 0.015)).toFixed(2);

    return bac;

  }

  //update BAC every 15 minutes
  updateBac () {
    let lastdrink = {};
    let numberOfDrinksCopy = this.state.numberOfDrinks;
    lastdrink.number = (numberOfDrinksCopy[ (numberOfDrinksCopy.length - 1) ].number);
    lastdrink.timeOfLastDrink = new Date().toLocaleString();

    let bac = this.calculateBac(lastdrink.number, this.state.numberOfDrinks[ 0 ].timeOfLastDrink);

    this.setState({ bac });
  }

  drinkTracker = (e) => {
    e.preventDefault();

    let lastdrink = {};
    let numberOfDrinksCopy = this.state.numberOfDrinks;
    lastdrink.number = (numberOfDrinksCopy[ (numberOfDrinksCopy.length - 1) ].number) + 1;
    lastdrink.timeOfLastDrink = new Date().toLocaleString();
    numberOfDrinksCopy.push(lastdrink);

    let bac = this.calculateBac(lastdrink.number, this.state.numberOfDrinks[ 0 ].timeOfLastDrink);

    this.setState({ numberOfDrinks: numberOfDrinksCopy, bac },
      () => this.checkBeforeSendAutomaticText());

    setInterval(() => { this.updateBac.bind(this); this.updateBac(); }, 900000);
  };


  checkIn = (e) => {
    e.preventDefault();
    console.log("Check in clicked");
    this.storeCheckinLocation();
  };

  storeCheckinLocation = () => {
    if (this.state.userPhoneNumber === 0) {
      this.setState({ userPhoneNumber: prompt("Please enter your phone number so sipSpot can send you alerts. sipSpot will never share your number with anyone else, ever."), emergencyContactNumber: prompt("Now please enter the phone number of an emergency contact in case you need to be picked up. This is OPTIONAL, but it's a really good idea to do.") });
    }
    this.setState({ theCheckinLatitude: this.state.latitude, theCheckinLongitude: this.state.longitude, proximityAlertSent: false, emergencyNotificationSent: false }, this.watchLocation);
    document.getElementById("test-display").innerText = "Check-In location: " + this.state.latitude + ", " + this.state.longitude + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  }

  watchLocation = () => {
    const watchId = navigator.geolocation.watchPosition(this.checkLocation);
    this.setState({ watchId });
  }

  checkLocation = (position) => {
    if (this.state.latitude === 0) {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    }
    if (this.state.theCheckinLatitude !== 0) {
      let theDifferenceLatitude = (Math.abs(position.coords.latitude - this.state.theCheckinLatitude)).toFixed(6);
      let theDifferenceLongitude = (Math.abs(position.coords.longitude - this.state.theCheckinLongitude)).toFixed(6);

      if (!this.state.proximityAlertSent) {
        if (theDifferenceLatitude > .0002 || theDifferenceLongitude > .0002) {
          document.getElementById("test-display").innerText = "MAJOR PROXIMITY CHANGE " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
          this.setState({ proximityAlertSent: true });
          navigator.geolocation.clearWatch(this.state.watchID);
          // TODO: use auto-notify number from settings.
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

  sendText = () => {
    const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`
    window.open("sms:1&body=" + encodeURIComponent("Come meet me out on the town! This link was generated by sipSpot: " + theUrl), "_self");
    return false;
  }

  checkBeforeSendAutomaticText = () => {
    if (this.state.bac > 0.3 && this.state.emergencyContactNumber !== 0 && this.state.emergencyNotificationSent === false) { //TODO: bring this level down for production
      this.sendAutomaticText();
    }
  }

  sendAutomaticText = () => {
    this.setState({ emergencyNotificationSent: true });
    // TODO: use auto-notify number from settings.
    const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`;
    const theMessage = "Please come give me a ride; I have had too much to drink. Here is a Google Maps link to my location. (This message *auto-generated* by sipSpot) " + theUrl;
    TEXT.sendText({ to: this.state.emergencyContactNumber, message: theMessage })
      .then(res => {
        console.log("AUTOMATIC text message sent, response:");
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div>
        <Container className="home">
          <MenuModal user={ this.props.user } logout={ this.props.logout } modal={ this.state.modal } toggle={ this.state.toggle.bind(this) }></MenuModal>
          <Row>
            <Col>
              <div id="title">sipSpot</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="test-display">test display</div>
              <PostDrink drinks={ this.state.numberOfDrinks[ ((this.state.numberOfDrinks).length) - 1 ] } bac={ this.state.bac }></PostDrink>
            </Col>
          </Row>
        </Container>
        <Container className="controls controls-container">
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
              <Button className="cntrl-btn" data-test="controls-friends" onClick={ this.sendText }>Contact Friends</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
