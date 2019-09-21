import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";

class PublicPage extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios.get("/currentEvents").then(response => {
      console.log(response.data);
      this.setState({ events: response.data });
    });
  }
  render() {
    const currentEvents = this.state.events.map((i, events) => {
      return <div></div>;
    });
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
          <Link to="/login">
            <button className="button-ref-medium">Sign In</button>
          </Link>
        </header>
        <div className="events-ref"></div>
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
