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
      username: "",
      gender: "",
      email: "",
      phoneNumber: "",
      password: "",
      passVerify: "",
      matchingPass: false,
      created: false
    };
  }

  handleCreation = async () => {
    try {
      if(this.state.matchingPass === false) {
        alert("Your passwords must match!")
      }
      const {
        firstName,
        lastName,
        gender,
        email,
        password,
        username,
        phoneNumber
      } = this.state;
      const body = { firstName, lastName, gender, email, phoneNumber, password, username };
      await axios.post("create-new-user", body);
        this.setState({ created: true });
        alert("User successfully created!");
        this.props.history.push("/app/home_page");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  disabledHandler = () => {
    const { password, passVerify } = this.state;
    this.setState({ matchingPass: password === passVerify });
  };

  render() {
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Let's get your account created!</div>
        <div className="login-logout">
          <input
            className="input-ref-large"
            type="text"
            placeholder="First Name"
            onChange={e => this.setState({ firstName: e.target.value })}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="text"
            placeholder="Last Name"
            onChange={e => this.setState({ lastName: e.target.value })}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="text"
            placeholder="LFG User Name"
            onChange={e => this.setState({ username: e.target.value })}
            required="required"
          ></input>
          <select
            className="input-ref-large"
            name="gender"
            onChange={e => this.setState({ gender: e.target.value })}
          >
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input
            className="input-ref-large"
            type="email"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="tel"
            placeholder="Phone Number"
            onChange={e => this.setState({ phoneNumber: e.target.value })}
            required="required"
            pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
          ></input>
          <input
            className="input-ref-large"
            type="password"
            placeholder="Password"
            onChange={async e => {
              await this.setState({ password: e.target.value });
              this.disabledHandler();
            }}
            required="required"
          ></input>
          <input
            className="input-ref-large"
            type="password"
            placeholder="Verify Password"
            onChange={async e => {
              await this.setState({ passVerify: e.target.value });
              this.disabledHandler();
            }}
            required="required"
          ></input>
          {/* <Link to="/homepage"> */}
          <button
            className="button-ref-medium"
            onClick={this.handleCreation}
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
