import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <footer className="footer-ref">
        <Link to="/app/home_page">
          <button className="home-button-ref">Home</button>
        </Link>
        <Link to="/app/create_event">
          <button className="add-event-ref">+</button>
        </Link>
        <Link to="/app/settings">
          <button className="account-settings-ref">Settings</button>
        </Link>
        <Link to="/app/manage_events">
          <button className="account-settings-ref">Events</button>
        </Link>
      </footer>
    );
  }
}

export default Navbar;
