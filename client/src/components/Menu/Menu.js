import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './menu.css';

const MenuModal = (props) => {
    return (
        <div>
            <Button color="secondary" onClick={ props.toggle } className="menu-btn" data-test="home-menu-button">Menu</Button>
            <Modal isOpen={ props.modal } toggle={ props.toggle } className="menu">
                <ModalHeader toggle={ props.toggle }>
                    <Row>
                        <Col>
                            <Link to='/quickstart' className="menu-button quickstart" data-test="menu-quickstart">Quick Start</Link>
                        </Col>
                    </Row>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <Container>
                        <Row>
                            <Col>
                                <button className="menu-button" data-test="menu-alerts" toggleAlerts={ props.toggleAlerts } onClick={ props.toggleAlerts }>Alerts</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to='/history' className="menu-button" data-test="menu-history">History</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="menu-button" data-test="menu-settings" toggleSettings={ props.toggleSettings } onClick={ props.toggleSettings }>Settings</button>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                {/* <ModalFooter> */ }
                {/* <Button color="secondary" onClick={ props.toggle }>Close</Button> */ }
                {/* </ModalFooter> */ }
            </Modal>
        </div>
    )

};

export default MenuModal;