import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import GranularEvent from "./granular_event";

class CreatedEvents extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios
      .get(`/events_created`, {
        params: { user_id: this.props.userInfo.user_id }
      })
      .then(response => {
        console.log('these are created events', response.data)
        this.setState({ events: response.data });
      });
  }

  render() {
    const currentEvents = this.state.events.map(event => {
      let creator = true;
      return (
        <GranularEvent
          event={event}
          creator={creator}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default CreatedEvents;
