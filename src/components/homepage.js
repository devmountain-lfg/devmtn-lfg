import React, { Component } from "react";
import SingleEvent from "./singleEvent";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";
class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      myEvents: [],
      id: ""
    };
  }

  componentDidMount(id) {
    axios.get(`/events/${id}`).then(response => {
      console.log(response.data);
      this.setState({ myEvents: response.data });
    });
  }

  handleLogout = () => {
    axios.get("/logout").then(this.props.history.push("/home_page"));
  };

  render() {
    return (
      <div className="publicpage-ref">
        <header className="header-ref">
          <button className="button-ref-medium" onClick={this.handleLogout}>
            Sign Out
          </button>
        </header>
        <div className="calendar-ref">Calendar will go here</div>
        <div className="my-events-ref">
          <div className="event-title">Events in your area</div>
          <SingleEvent />
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

export default HomePage;
