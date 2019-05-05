import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { InfoCard } from '../../components/InfoCard';
import { FormBtn } from '../../components/Form';


class SipSpotEntry extends Component {
    state = {
        
      };

    drinkTracker = (event) => {
		event.preventDefault();
		console.log('drinkTracker');
    }
    checkIn = (event) => {
		event.preventDefault();
		console.log('checkIn');
    }
    
    help = (event) => {
		event.preventDefault();
		console.log('help');
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
                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
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
                                <FormBtn onClick={this.help}>Help</FormBtn>
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
