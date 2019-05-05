
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Controls.css';

function Controls() {
    return (
        <Container className="controls">
            <Row>
                <Col>
                <Button data-test="controls-alert">Alert</Button>
                </Col>
                <Col>
                <Button data-test="controls-checkin">Check-In/Out</Button>
                </Col>
                <Col className="console-drinks">
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
}

export default Controls;