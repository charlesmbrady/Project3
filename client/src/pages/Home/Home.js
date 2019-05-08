import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import MenuModal from '../../components/Menu';
import './Home.css';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            numberOfDrinks: 0,
            location: "",
            bac: "",
            modal: false,
            toggle () {
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
                <section id="location-display">location display</section>
            </div>
        );
    }
}

export default Home;