import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";

class createuser extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      passVerify: "",
      matchingPass: false,
      created: false
    };
  }

  handleCreation = async () => {
    try {
      console.log(this.state);
      // const body = {};

      // axios.post("/create_user", body).then(response => {
      //   this.setState({ created: true });
      //   this.props.history.push("/app/home_page");
      // });
    } catch (error) {
      console.error(error);
    }
  };

  disabledHandler = () => {
    const { password, passVerify } = this.state;
    if (password === passVerify) {
      this.setState(prevState => ({
        matchingPass: !prevState.matchingPass
      }));
    }
  };

  render() {
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Let's get your account created!</div>
        <div className="login-logout">
          <input
            className="input-ref-large"
            type="text"
            placeholder="first"
            onChange={e => this.setState({ firstName: e.target.value })}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="text"
            placeholder="last"
            onChange={e => this.setState({ lastName: e.target.value })}
            required="required"
          ></input>
          <select
            className="input-ref-large"
            name="gender"
            onChange={e => this.setState({ gender: e.target.value })}
          >
            <option value="" disabled selected>Select your option</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input
            className="input-ref-large"
            type="email"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
            required="required"
          ></input>

          <input
            className="input-ref-large"
            type="password"
            placeholder="password"
            onChange={e => {
              this.disabledHandler();
              this.setState({ password: e.target.value });
            }}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="password"
            placeholder="verifyPass"
            onChange={e => {
              this.disabledHandler();
              this.setState({ passVerify: e.target.value });
            }}
            required="required"
          ></input>
          {/* <Link to="/homepage"> */}
          <button
            className="button-ref-medium"
            onClick={this.handleCreation}
            disabled={!this.state.matchingPass}
          >
            Create Account
          </button>
          {/* </Link> */}
          <Link to="/login" className="sign-up-link">
            Already have an account? Click here to sign in!
          </Link>
        </div>
      </div>
    );
  }
}

export default createuser;
