import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import MenuModal from '../../components/Menu';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfDrinks: 0,
      location: "",
      bac: "",
      modal: false,
      toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
      }     
    };
  }

  drinkTracker = (e) => {
    e.preventDefault();
    console.log("drink tracker clicked");
  };
  checkIn = (e) => {
    e.preventDefault();
    console.log("Check in clicked");
  };
  alert = (e) => {
    e.preventDefault();
    console.log("alert clicked");
  };

  render() {
    return (
      <div>
        <Container className="home">
        <MenuModal user={this.props.user} logout={this.props.logout} modal={this.state.modal} toggle={this.state.toggle.bind(this)}></MenuModal>
          <Row>
            <Col>
              <h1>Home Screen</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Welcome to SipSpots.  This page will have a button for checking in/out of a location,
                and adding drinks.  It will also have a link to the menu, an alert button and a display that
                calculates your estimated BAC.
              </p>
            </Col>
          </Row>
        </Container>
        <Container className="controls">
          <Row>
            <Col>
              <Button data-test="controls-alert" onClick={this.alert}>Alert</Button>
            </Col>
            <Col>
              <Button data-test="controls-checkin" onClick={this.checkIn}>Check-In/Out</Button>
            </Col>
            <Col className="console-drinks"  onClick={this.drinkTracker}>
              <Row>
                  <Col>
                  <Button data-test="controls-beer">Beer</Button>
                  </Col>
              </Row>
              <Row>
                  <Col>
                  <Button data-test="controls-wine">Wine</Button>
                  </Col>
              </Row>
              <Row>
                  <Col>
                  <Button data-test="controls-liquor">Liqour</Button>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );

  }
}

export default Home;
