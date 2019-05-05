
import React from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Controls.css';

function Controls() {
    return (
        <Container className="controls">
            <Row>
                <Col>
                <Button>Alert</Button>
                </Col>
                <Col>
                <Button>Check-In/Out</Button>
                </Col>
                <Col className="console-drinks">
                    <Row>
                        <Col>
                        <Button>Beer</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button>Wine</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button>Liqour</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>





    )
}

export default Controls;