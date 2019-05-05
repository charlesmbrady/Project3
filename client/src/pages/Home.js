/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MenuModal from '../components/Menu/Menu';
import Controls from '../components/Controls/Controls';

// import './comp.css';

function Home(props) {

  return (
    <div>
    <Container className="home">
    <MenuModal logout={props.logout}></MenuModal>
      <Row>
        <Col>
          <h1>Home Screen</h1>
          
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Welcome to SipSpots.  This page will have a button for checking in/out of a location,
             and adding drinks.  It will also have a link to the menu, an alert button and a display that
             calculates your estimated BAC.
          </p>
        </Col>
      </Row>
    </Container>
    <Controls />
    </div>
  );
}


export default Home;
