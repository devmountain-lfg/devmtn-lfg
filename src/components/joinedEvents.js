import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";
import moment from "moment";

class JoinedEvents extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    console.log(this.props.userInfo);
    axios
      .get(`/events_joined`, {
        params: { user_id: this.props.userInfo.user_id }
      })
      .then(response => {
        this.setState({ events: response.data });
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
          <div>
            {moment(event.event_date_start).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div>{event.event_location}</div>
        </div>
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default JoinedEvents;
