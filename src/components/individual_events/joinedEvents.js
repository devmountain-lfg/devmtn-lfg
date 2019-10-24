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

  render() {
    const joinedEvents = this.state.events.map(event => {
      let joinee = true;
      return (
        <GranularEvent
          event={event}
          joinee={joinee}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return <div>{joinedEvents}</div>;
  }
}

export default JoinedEvents;
