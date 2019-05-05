/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './menu.css';

class MenuModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            logout: props.logout
            
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.toggle} className="menu-btn">. . .</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="menu">
                    <ModalHeader toggle={this.toggle}>
                        <Container>
                            <Row>
                                <Col>
                                    <Link to='/login'>Login</Link>
                                </Col>


                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/signup'>Signup</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to="#" className="logout" onClick={this.props.logout}>Logout</Link>
                                </Col>
                            </Row>
                        </Container>
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <Container>
                            <Row>
                                <Col>
                                    <Link to='/history'>History</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/friends'>Friends</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/settings'>Settings</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/rideshare'>Get a Ride</Link>
                                </Col>
                            </Row>
                        </Container>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MenuModal;