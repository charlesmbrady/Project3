import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { InfoCard } from '../../components/InfoCard';
import { Input, FormBtn } from '../../components/Form';


class SipSpotEntry extends Component {
    state = {
        
      };

    handleSubmit = (event) => {
		event.preventDefault();
		console.log('handleSubmit');
		this.props.login(this.state.username, this.state.password);
		this.setState({
			redirectTo: '/login'
		});
	}

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div className="row">
                            <div  className="col-md-12 col-lg-12 col-xl-12">
                                <h1 style={{textAlign: "center"}}>sipSpot</h1>           
                            </div>
                        </div>
                        <div className="row">
                            <div  className="col-md-12 col-lg-12 col-xl-12">
                                <Link to="/login">Login/Register</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                {/* <Card ></Card> */}
                            </div>
                            <div className="col-md-8 col-lg-8 col-xl-8"></div>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <InfoCard >Uber Link coming soon...</InfoCard>
                                <InfoCard >Color bar of alcohol consumption coming soon...</InfoCard>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 col-lg-1 col-xl-1">
                                <form>
                                <FormBtn onClick={this.drinkTracker}>Drink Tracker</FormBtn>
                                </form>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xl-4"></div>
                            <div className="col-md-1 col-lg-1 col-xl-1">
                                <form>
                                <FormBtn onClick={this.checkIn}>Check-In</FormBtn>
                                </form>
                            </div>
                            <div className="col-md-5 col-lg-5 col-xl-5"></div>
                            <div className="col-md-1 col-lg-1 col-xl-1">
                                <form>
                                <FormBtn >Help</FormBtn>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SipSpotEntry;