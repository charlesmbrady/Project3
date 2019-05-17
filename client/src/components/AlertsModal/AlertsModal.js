import React from 'react';
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import './style.css';

const AlertsModal = (props) => {
    return ( <
        div >

        <
        Modal isOpen = {
            props.alertsModal
        }
        toggleAlerts = {
            props.toggleAlerts
        }
        className = "alerts" >
        <
        ModalHeader toggle = {
            props.toggleAlerts
        } >

        <
        /ModalHeader> <
        ModalBody className = "modal-body" >
        <
        Container >
        <
        h2 className = "alerts-label" > Alerts < /h2> <
        form >
        <
        div className = "form-group" >
        <
        label className = "form-check-label alerts-label" > BAC Alert Threshold < /label> <
        input type = "email"
        className = "form-control"
        id = "exampleInputEmail1"
        aria - describedby = "emailHelp"
        placeholder = "Ex. .08" > < /input>

        <
        /div> <
        div className = "form-group" >
        <
        label className = "alerts-label" > Location Alert Threshold Distance(ft) < /label> <
        input type = "password"
        className = "form-control"
        id = "exampleInputPassword1"
        placeholder = "Ex. 200" > < /input> <
        /div>

        <
        div className = "form-group" >
        <
        label className = "alerts-label" > Drink Count Alert Threshold < /label> <
        input type = "password"
        className = "form-control"
        id = "drinkCountThreshold"
        placeholder = "Ex. 5" > < /input> <
        /div>

        <
        button type = "submit"
        class = "btn btn-style" > Submit < /button> <
        /form> <
        /Container> <
        /ModalBody> <
        ModalFooter > {
            /* <Button color="secondary" onClick={ props.toggle }>Close</Button> */ } <
        /ModalFooter> <
        /Modal> <
        /div>
    )

};

export default AlertsModal;