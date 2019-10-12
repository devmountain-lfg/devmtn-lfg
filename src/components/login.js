import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      currentUser: []
    };
  }

  handleLogin = async user => {
    try {
      const body = {
        username: this.state.username,
        password: this.state.password
      };
      if (body.username && body.password) {
        axios.post("/login", body).then(response => {
          this.setState({ currentUser: user });
          this.props.history.push("/app/home_page");
        });
      } else {
        this.props.history.push("/login");
        alert("Login incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Welcome! Let's play a game</div>
        <div className="login-logout">
          <input
            className="input-ref-large"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
          ></input>
          <input
            className="input-ref-large"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          ></input>

          <button className="button-ref-medium" onClick={this.handleLogin}>
            Sign In
          </button>

          <Link
            to="/create_user"
            className="sign-up-link"
            style={{ textDecoration: "none" }}
          >
            Don't have an account? Click here to sign up!
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
