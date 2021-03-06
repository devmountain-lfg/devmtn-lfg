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
          <div className="title">Looking for Group</div>
          <button className="button-ref-medium" onClick={this.handleLogout}>
            Sign Out
          </button>
        </header>
        <div className="calendar-events">
          <div className="calendar-ref">
            <Calendar {...this.props} userInfo={this.props.userInfo} />
          </div>
          <div className="my-events-ref">
            <div className="event-title">Public Events</div>
            <UserEvents userInfo={this.props.userInfo} />
          </div>
        </div>
        <Navbar />
      </div>
    );
  }
}

export default HomePage;
