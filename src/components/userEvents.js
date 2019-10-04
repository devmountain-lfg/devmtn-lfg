import React, { Component } from "react";
import "../styling/publicpage.css";
import axios from "axios";

class UserEvents extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    console.log(this.props.userInfo);
    axios.get(`/events/${this.props.userInfo.user_id}`).then(response => {
      return axios.get("/current_events").then(response => {
        this.setState({ events: response.data });
      });
    });
  }

  render() {
    console.log(this.state.events);
    const currentEvents = this.state.events.map(event => {
      return (
        <div className="event" key={event.event_id}>
          <div className="event-top">
            <div className="creator-ref">
              <div className="creator">{event.creator_name}</div>
              <div className="people">
                {event.current_player_count}/{event.max_players}
              </div>
            </div>
            <h1 className="title">{event.activity_name}</h1>
            <div className="event-buttons">
              <button>DM</button>
              <button>Join</button>
            </div>
          </div>
          <div className="message">{event.event_message}</div>
          <div>{event.event_date_start}</div>
          <div>{event.event_location}</div>
        </div>
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default UserEvents;
