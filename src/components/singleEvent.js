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
    axios.get("/current_events").then(response => {
      console.log(response.data);
      this.setState({ events: response.data });
    });
  }
  render() {
    const currentEvents = this.state.events.map((i, events) => {
      return (
        <div className="event">
          <div className="event-top">
            <div className="creator-ref">
              <div className="creator">Creator</div>
              <div className="people">10/18</div>
            </div>
            <h1 className="title">Football</h1>
            <div className="event-buttons">
              <button>DM</button>
              <button>Join</button>
            </div>
          </div>
          <div className="message">Here is a message about the event</div>
          <div>9/30/19 @ 7:00 PM</div>
          <div>Nolan Park, Eagle Mountain UT 84005</div>
        </div>
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default PublicPage;
