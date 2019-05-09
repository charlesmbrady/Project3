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
      latitude: 0,
      longitude: 0,
      theLastLatitude: 0,
      theLastLongitude: 0,
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

    this.setState({ numberOfDrinks: numberOfDrinksCopy, bac });

    setInterval(() => { this.updateBac.bind(this); this.updateBac(); }, 900000);
  };


  checkIn = (e) => {
    e.preventDefault();
    console.log("Check in clicked");
  };

  watchLocation = () => {
    navigator.geolocation.watchPosition(this.storeLocation);
  }

  storeLocation = (position) => {
    this._isMounted && this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    console.log(position.coords.latitude, position.coords.longitude);
    this.checkLocation(position);
  }

  checkLocation = (position) => {
    console.log('in checkLocation');
    if (this.state.theLastLatitude !== 0) {
      console.log(position);
      let theDifferenceLatitude = (Math.abs(position.coords.latitude - this.state.theLastLatitude)).toFixed(6);
      let theDifferenceLongitude = (Math.abs(position.coords.longitude - this.state.theLastLongitude)).toFixed(6);

      if (theDifferenceLatitude > .0001 || theDifferenceLongitude > .0001) { //~50 feet
        this.setState({ theLastLatitude: position.coords.latitude.toFixed(6), theLastLongitude: position.coords.longitude.toFixed(6) });

        window.navigator.vibrate([ 200, 100, 200 ]);
        alert('looks like you are leaving the area');
      } else {
        window.navigator.vibrate([ 200 ]);
      }
    }
  }

  sendText = () => {
    const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`
    window.open("sms:1&body=" + encodeURIComponent("Come meet me out on the town! This link was generated by sipSpot: " + theUrl), "_self");
    return false;
  }

  sendAutomaticText = () => {
    // TODO: use auto-notify number from settings.
    const theUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude} |`
    const theMessage = "Please come give me a ride; I have had too much to drink. The following text will include a Google Maps link to my location. This message *auto-generated* by sipSpot.";
    TEXT.sendText({ to: 19192608858, message: theMessage })
      .then(res => {
        console.log("text message sent, response:");
        console.log(res);
        TEXT.sendText({ to: 19192608858, message: theUrl })
          .then(res => {
            console.log("map link sent, response:");
            console.log(res);
          })
          .catch(err => console.log(err));

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
              {/* moved to Quickstart.js */ }
              {/* <p id="how-to">Click <em>Check-in</em> to keep track of where your stuff is (your credit card on a bar tab, your jacket, your friends). Click <em>Add Drink to Count</em> to keep track of your drinks over time to get a rough estimate of your blood-alcohol level. Click <em>Contact Friends</em> to send a link to your location to friends. Click <em>Get an Uber</em> to get a safe ride home.</p> */ }
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
            <Col>
              <Button className="cntrl-btn" data-test="controls-friends" onClick={ this.sendAutomaticText }>Test Auto</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
