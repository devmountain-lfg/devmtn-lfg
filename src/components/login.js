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
      currentUser: ""
    };
  }

  handleLogin = async () => {
    try {
      const body = {
        username: this.state.username,
        password: this.state.password
      };

      axios.post("/login", body).then(response => {
        this.setState({ currentUser: response.data });
        this.props.history.push("/app/home_page");
      });
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
          ></input>
          <input
            className="input-ref-large"
            type="password"
            placeholder="password"
          ></input>
          <Link to="/homepage">
            <button className="button-ref-medium" onClick={this.handleLogin}>
              Sign In
            </button>
          </Link>
          <Link to="/create_user" className="sign-up-link">
            Don't have an account? Click here to sign up!
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
