import React, { Component } from "react";
import { Link } from "react-router-dom";
import SingleEvent from "./singleEvent";
import "../styling/publicpage.css";

class PublicPage extends Component {
  render() {
    console.log();
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
        Check out these events, fam!
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
