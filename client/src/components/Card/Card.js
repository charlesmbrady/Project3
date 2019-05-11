import React from "react";
import './style.css';

export const Card = (props) => (
  <div className="card">
    <div className="card-header">
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
