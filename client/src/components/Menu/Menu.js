import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col>
                                { props.user ? (<h2>{ props.user.firstName }</h2>) : <Link to='/login' className="menu-button menu-login">Login</Link>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                { !props.user ? <Link to='/signup' className="menu-button">Signup</Link> : null }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                { props.user ? (<Link to="#" className="menu-button logout" onClick={ props.logout }>Logout</Link>) : null }
                            </Col>
                        </Row>
                    </Container>
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