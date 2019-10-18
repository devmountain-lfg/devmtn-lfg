import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      gender: "",
      email: "",
      phone_number: ""
    };
  }

  componentDidMount() {
    axios.get("/me").then(response => {
      console.log(response.data);
      const {
        first_name,
        last_name,
        username,
        gender,
        email,
        phone_number
      } = response.data;
      this.setState({
        first_name,
        last_name,
        username,
        gender,
        email,
        phone_number
      });
    });
  }

  handleUpdate = async () => {
    try {
      const {
        first_name,
        last_name,
        email,
        username,
        gender,
        phone_number
      } = this.state;
      const body = {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        email: email,
        phone_number: phone_number,
        username: username
      };
      await axios.put("/update_user", body);
      alert("User successfully updated!");
      this.props.history.push("/app/home_page");
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteAccount = () => {
    this.props.history.push("/app/delete_account");
  }

  render() {
    console.log(this.state);
    const {
      first_name,
      last_name,
      email,
      username,
      gender,
      phone_number
    } = this.state;
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Settings</div>
        <div className="login-logout">
          <input
            className="input-ref-large"
            type="text"
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          ></input>
          <input
            className="input-ref-large"
            type="text"
            name="last_name"
            value={last_name}
            onChange={e => this.handleChange(e)}
          ></input>
          <input
            className="input-ref-large"
            type="text"
            name="username"
            value={username}
            onChange={e => this.handleChange(e)}
          ></input>
          <select
            className="input-ref-large"
            name="gender"
            value={gender}
            onChange={e => this.handleChange(e)}
          >
            <option value="" name="gender" disabled selected>
              Select your gender
            </option>
            <option value="M" name="gender">
              Male
            </option>
            <option value="F" name="gender">
              Female
            </option>
          </select>
          <input
            className="input-ref-large"
            type="email"
            name="email"
            value={email}
            onChange={e => this.handleChange(e)}
          ></input>
          <input
            className="input-ref-large"
            type="tel"
            name="phone_number"
            value={phone_number}
            onChange={e => this.handleChange(e)}
            pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
          ></input>

          <button className="button-ref-medium" onClick={this.handleUpdate}>
            Save
          </button>
          <Link to="/app/reset_password" className="sign-up-link">Click Here to Reset Password</Link>
        </div>
        <Navbar />
      </div>
    );
  }
}

export default withRouter(Settings);
