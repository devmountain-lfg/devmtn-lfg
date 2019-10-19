import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import GranularEvent from "./granular_event";

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
    const joinedEvents = this.state.events.map(event => {
      let joinee = true;
      return (
        <GranularEvent
          event={event}
          joinee={joinee}
          user_id={this.props.userInfo.user_id}
          handleCancel={this.handleCancel}
          handleJoin={this.handleJoin}
        />
      );
    });
    return <div>{joinedEvents}</div>;
  }
}

export default JoinedEvents;
