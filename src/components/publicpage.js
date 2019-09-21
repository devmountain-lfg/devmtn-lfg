import React, { Component } from "react";
import { Link } from "react-router-dom";
import SingleEvent from "./singleEvent";
import "../styling/publicpage.css";
import axios from "axios";

class PublicPage extends Component {
  render() {
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
          <Link to="/login">
            <button className="button-ref-medium">Sign In</button>
          </Link>
        </header>
        <div className="events-ref">
          <SingleEvent />
        </div>
        <footer className="footer-ref">
          <button className="home-button-ref">Home</button>
          <button className="add-event-ref">+</button>
          <button className="account-settings-ref">=</button>
        </footer>
      </div>
    );
  }
}

export default PublicPage;
