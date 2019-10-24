import React, { Component } from "react";
import "../../styling/publicpage.css";
import moment from "moment";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class GranularEvent extends Component {
  constructor() {
    super();

    this.state = {
      joined: false,
      deleted: false
    };
  }

  handelClick = async props => {
    this.props.history.push(`/app/details/${this.props.event.event_id}`);
  };

  handleDelete = id => {
    axios
      .delete(`/delete_event/${id}`)
      .then(() => {
        alert("You have successfully deleted the event!");
        this.setState({
          deleted: true
        });
      })
      .catch(err => {
        console.log("Here is the delete error:", err);
      });
  };

  handleJoin = id => {
    const body = {
      eventId: id
    };
    axios
      .post("/join_event", body)
      .then(response => {
        alert("You have successfully joined the event!");
        this.setState({ joined: true });
      })
      .catch(err => {
        console.log("Here is the join error:", err);
      });
  };

  handleCancel = id => {
    axios
      .delete("/unjoin_event", {
        params: { event_id: id }
      })
      .then(response => {
        alert("You have successfully unjoined the event!");
        this.setState({ joined: false });
      })
      .catch(err => {
        console.log("Here is the unjoin error:", err);
      });
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
                onClick={() => this.handleDelete(event.event_id)}
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
          {this.props.joinee || this.state.joined === true ? (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.handleCancel(event.event_id)}
              >
                Leave
              </button>
            </div>
          ) : null}
          {!this.props.joinee && !this.props.creator ? (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.handleJoin(event.event_id)}
              >
                Join
              </button>
            </div>
          ) : null}
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
