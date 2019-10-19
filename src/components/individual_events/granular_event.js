import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

class GranularEvent extends Component {
  constructor() {
    super();

    this.state = {
      joined: null
    };
  }

  componentDidMount() {
    if (this.props.user_id === this.props.event.creator_id) {
      this.setState({ joined: true });
    } else if (this.props.joinee) {
      this.setState({ joined: true })
    } this.setState({ joined: false })
  }

  handleJoin = id => {
    const body = {
      eventId: id
    };
    axios
      .post("/join_event", body)
      .then(response => {

        alert("You have successfully joined the event!");
        this.setState({ joined: true });
        console.log(this.state)
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
      .then(() => {
        alert("You have successfully unjoined the event!");
        this.setState({ joined: false });
      })
      .catch(err => {
        console.log("Here is the unjoin error:", err);
      });
  };

  handleDelete = id => {
    axios
      .delete("/event", {
        params: { event_id: id }
      })
      .then(() => {
        alert("You have successfully deleted the event!");
      })
      .catch(err => {
        console.log("Here is the delete error:", err);
      });
  };

  handelClick = async (props) => {
    console.log(this.props)
    this.props.history.push(`/app/details/${this.props.event.event_id}`)
  }

  render() {
    const { event } = this.props;
    if (this.props.joinee && this.state.joined === false) return <div>"loading..."</div>
    return (
      <div className="event" key={event.event_id}  >
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

          {this.state.joined === true ? (
            <div className="event-buttons">
              <button
                className="button-ref-small"
                onClick={() => this.handleCancel(event.event_id, event)}
              >
                Leave
                </button>
            </div>
          ) : this.props.creator ? null :
              this.state.joined === false ? (
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
        <div className="message" onClick={this.handelClick}>{event.event_message}</div>
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
