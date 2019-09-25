import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  render() {
    return (
      <div className="publicpage-ref">
        <input className="input-ref-medium" type="text"></input>
        <input className="input-ref-medium" type="password"></input>
      </div>
    );
  }
}

export default Login;
