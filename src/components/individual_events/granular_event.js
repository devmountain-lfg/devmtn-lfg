import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

class GranularEvent extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handelClick = async props => {
    console.log(this.props);
    this.props.history.push(`/app/details/${this.props.event.event_id}`);
  };

  render() {
    const { event } = this.props;
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

          {this.props.creator ? (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.props.handleDelete(event.event_id)}
              >
                Delete
              </button>
              <Link
                to={`/app/change_event/${event.event_id}`}
                style={{ textDecoration: "none" }}
              >
                <button className="button-ref-small">Edit</button>
              </Link>
            </div>
          ) : null}

          {this.props.joinee ? (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.props.handleCancel(event.event_id)}
              >
                Leave
              </button>
            </div>
          ) : (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.props.handleJoin(event.event_id)}
              >
                Join
              </button>
            </div>
          )}
        </div>
        <div className="message" onClick={this.handelClick}>
          {event.event_message}
        </div>
        <div className="event-date">
          {moment(event.event_date_start).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        </div>
        <div className="event-location">{event.event_location}</div>
      </div>
    );
  }
}

export default withRouter(GranularEvent);
