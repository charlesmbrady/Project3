import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import MenuModal from '../../components/Menu';
import PostDrink from '../../components/PostDrink';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfDrinks: [{number:0,timeOfLastDrink: [new Date().toLocaleString()]}],
      location: "",
      latitude: 0,
      longitude: 0,
      bac: 0,
      modal: false,
      toggle() {
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

  drinkTracker = (e) => {
    e.preventDefault();
    
    let lastdrink={};
    let numberOfDrinksCopy=this.state.numberOfDrinks;
    lastdrink.number=(numberOfDrinksCopy[(numberOfDrinksCopy.length-1)].number)+1;
    lastdrink.timeOfLastDrink=new Date().toLocaleString();
    numberOfDrinksCopy.push(lastdrink);

    //calculate BAC(using 130lbs as generic weight and r=0.55 for conservative estimate)
    let bac=((lastdrink.number*14)/(58967*0.55))*100;

    //elapsed time 
    let first=(Date.parse(this.state.numberOfDrinks[0].timeOfLastDrink))/3600000;
    let now = (Date.parse(new Date().toLocaleString()))/3600000;
    let elapsedTime=now-first;
    bac=(bac-(elapsedTime*0.015)).toFixed(2);

    
    this.setState({numberOfDrinks:numberOfDrinksCopy,bac});
    
  };
  checkIn = (e) => {
    e.preventDefault();
    console.log("Check in clicked");
  };

  watchLocation = () => {
    navigator.geolocation.watchPosition(this.storePosition);
  }

  storePosition = (position) => {
    this._isMounted && this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    console.log(position.coords.latitude, position.coords.longitude);
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
              <p id="how-to">Click <em>Check-in</em> to keep track of where your stuff is (your credit card on a bar tab, your jacket, your friends). <em>Add Drink to Count</em> to keep track of your drinks over time to get a rough estimate of your blood-alcohol level. <em>Contact Friends</em> to send a link to your location to friends. Click <em>Get an Uber</em> to get a safe ride home.</p>
                <PostDrink drinks={ this.state.numberOfDrinks[((this.state.numberOfDrinks).length)-1] } bac={this.state.bac}></PostDrink>
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
              <Button className="cntrl-btn" data-test="controls-friends" href="mailto:?subject=Come%20join%20me!%20Link%20to%20my%20location%20enclosed.&body=my%20location">Contact Friends</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
