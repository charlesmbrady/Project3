import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './menu.css';

const MenuModal = (props) => {
    return (
        <div>
            <Button color="secondary" onClick={ props.toggle } className="menu-btn" data-test="home-menu-button">. . .</Button>
            <Modal isOpen={ props.modal } toggle={ props.toggle } className="menu">
                <ModalHeader toggle={ props.toggle }>
                    <Container>
                        <Row>
                            <Col>
                                { props.user ? (<h2>{ props.user.firstName }</h2>) :
                                    <Link to='/login'>Login</Link>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                { !props.user ? <Link to='/signup'>Signup</Link> : null }
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                { props.user ? (<Link to="#" className="logout" onClick={ props.logout }>Logout</Link>) : null }
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <Container>
                        <Row>
                            <Col>
                                <Link to='/alerts' data-test="menu-alerts">Alerts</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to='/history' data-test="menu-history">History</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to='/settings' data-test="menu-settings">Settings</Link>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={ props.toggle }>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

};

export default MenuModal;