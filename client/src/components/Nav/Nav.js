import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello Guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Col size="md-2">
        {!props.user ? (
          <Link to="/login" style={{color: "black"}}>Login/Register</Link> 
        ) : (
          <p>You Are Logged in</p>
        )}
      </Col>
      <Col size="md-7"></Col>
      <Col size="md-3">
       {props.user ? (
        <div className="float-right">
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
        ) : (
          <div className="float-right">
          <br/>{greeting} 
          </div>
        )}
      </Col>
    </nav>
  )
};

export default Nav;
