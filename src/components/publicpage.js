import React, { Component } from "react";
import { Link } from "react-router-dom";
import SingleEvent from "./individual_events/singleEvent";
import "../styling/publicpage.css";
import Navbar from "./navbar";

class PublicPage extends Component {
  render(props) {
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
          <div className="welcome-back">Looking for a group?</div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="button-ref-medium">Sign In</button>
          </Link>
        </header>
        <div className="events-ref">
          <SingleEvent {...this.props} />
        </div>
        <Navbar />
      </div>
    );
  }
}

export default PublicPage;
