import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './menu.css';

const MenuModal = (props) => {
    return (
        <div>
            <Button onClick={ props.toggle } className="menu-btn" data-test="home-menu-button">Menu</Button>
            <Modal isOpen={ props.modal } toggle={ props.toggle } className="menu">
                <ModalHeader toggle={ props.toggle }>
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
                <ModalFooter>
                    {/* TODO: Logout needs to be connected to the function handleLogout in Home.jsx */ }
                    <button className="menu-button" data-test="menu-logout">Logout</button>
                </ModalFooter>
            </Modal>
        </div>
    )

};

export default MenuModal;