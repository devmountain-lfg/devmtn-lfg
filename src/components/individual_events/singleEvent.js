import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import moment from "moment";

class SingleEvent extends Component {
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

  handleAttempt = () => {
    alert(
      "We'd love for you to particpate in these activities. Please sign in or create an account in order to do so!"
    );
    this.props.history.push("/login");
  };

  render() {
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
              <button onClick={this.handleAttempt}>Join</button>
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

export default SingleEvent;
