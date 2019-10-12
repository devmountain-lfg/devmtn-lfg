import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <footer className="footer-ref">
        <Link to="/app/home_page" style={{ textDecoration: "none" }}>
          <button className="home-button-ref">Home</button>
        </Link>
        <Link to="/app/create_event" style={{ textDecoration: "none" }}>
          <button className="add-event-ref">Create</button>
        </Link>
        <Link to="/app/settings" style={{ textDecoration: "none" }}>
          <button className="account-settings-ref">Settings</button>
        </Link>
        <Link to="/app/manage_events" style={{ textDecoration: "none" }}>
          <button className="account-settings-ref">Events</button>
        </Link>
      </footer>
    );
  }
}

export default Navbar;
