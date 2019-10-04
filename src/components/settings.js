import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: "",
      first_name: "",
      last_name: "",
      username: "",
      gender: "",
      email: "",
      phone_number: "",
      user_password: "",
      passVerify: "",
      matchingPass: false
    };
  }

  componentDidMount() {
    axios.get("/me").then(response => {
      console.log(response.data);
      this.setState({ currentUser: response.data });
    });
  }

  handleCreation = async () => {
    try {
      if (this.state.matchingPass === false) {
        alert("Your passwords must match!");
      }
      const {
        first_name,
        last_name,
        email,
        username,
        gender,
        phone_number,
        user_password
      } = this.state;
      const body = {
        firstName: first_name,
        lastName: last_name,
        gender: gender,
        email: email,
        phoneNumber: phone_number,
        password: user_password,
        username: username
      };
      await axios.put("/update_user", body);
      alert("User successfully updated!");
      this.props.history.push("/app/home_page");
    } catch (error) {
      console.error(error);
    }
  };

  disabledHandler = () => {
    const { password, passVerify } = this.state;
    this.setState({ matchingPass: password === passVerify });
  };

  handleChange = e => {
    this.setState({ currentUser: { [e.target.name]: e.target.value } });
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      gender,
      phone_number,
      user_password
    } = this.state.currentUser;
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
            <option value={gender} disabled selected>
              Select your gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
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
          <input
            className="input-ref-large"
            type="password"
            name="user_password"
            value={user_password}
            onChange={async e => {
              await this.handleChange(e);
              this.disabledHandler();
            }}
          ></input>
          <input
            className="input-ref-large"
            type="password"
            name="passVerify"
            placeholder="Verify Password"
            onChange={async e => {
              await this.handleChange(e);
              this.disabledHandler();
            }}
            required="required"
          ></input>

          <button className="button-ref-medium" onClick={this.handleCreation}>
            Save
          </button>
        </div>
        <footer className="footer-ref">
          <Link to="/app/home_page">
            <button className="home-button-ref">Home</button>
          </Link>
          <Link to="/app/create_event">
            <button className="add-event-ref">+</button>
          </Link>
          <Link to="/app/settings">
            <button className="account-settings-ref">=</button>
          </Link>
        </footer>
      </div>
    );
  }
}

export default Settings;
