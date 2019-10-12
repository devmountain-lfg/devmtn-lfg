import React, { Component } from "react";
import UserEvents from "./individual_events/userEvents";
import "../styling/publicpage.css";
import axios from "axios";
import Calendar from "./calendarComponent";
import Navbar from "./navbar";
class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      myEvents: []
    };
  }

  handleLogout = () => {
    axios
      .get("/logout")
      .then(() => {
        alert("Successfully logged out!");
        this.props.history.push("/public_page");
      })
      .catch(err => {
        console.log("here is err", err);
      });
  };

  render() {
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
          <button className="button-ref-medium" onClick={this.handleLogout}>
            Sign Out
          </button>
        </header>
        <div className="calendar-ref">
          <Calendar {...this.props} userInfo={this.props.userInfo} />
        </div>
        <div className="event-title">Events Near You</div>
        <div className="my-events-ref">
          <UserEvents userInfo={this.props.userInfo} />
        </div>
        <Navbar />
      </div>
    );
  }
}

export default HomePage;
