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
    console.log("this is props on CreatedEvents", this.props.userInfo);
    axios
      .get(`/events_created`, {
        params: { user_id: this.props.userInfo.user_id }
      })
      .then(response => {
        this.setState({ events: response.data });
      });
  }

  render() {
    const currentEvents = this.state.events.map(event => {
      return (
        <GranularEvent
          event={event}
          creator={true}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default CreatedEvents;
