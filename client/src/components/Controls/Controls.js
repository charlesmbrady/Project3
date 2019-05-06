
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Controls.css';

//function Controls() {
const Controls = () => {
    const drinkTracker = (e) => {
        e.preventDefault();
        console.log("drink tracker clicked");
    };
    const checkIn = (e) => {
        e.preventDefault();
        console.log("Check in clicked");
    };
    const alert = (e) => {
        e.preventDefault();
        console.log("alert clicked");
    };
    return (
        <Container className="controls">
            <Row>
                <Col>
                <Button data-test="controls-alert" onClick={alert}>Alert</Button>
                </Col>
                <Col>
                <Button data-test="controls-checkin" onClick={checkIn}>Check-In/Out</Button>
                </Col>
                <Col className="console-drinks"  onClick={drinkTracker}>
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





    )
};

export default Controls;