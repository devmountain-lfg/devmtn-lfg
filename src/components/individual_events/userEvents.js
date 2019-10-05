import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import GranularEvent from "./granular_event";

class UserEvents extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios
      .get(`/events`, { params: { user_id: this.props.userInfo.user_id } })
      .then(() => {
        return axios.get("/current_events").then(response => {
          this.setState({ events: response.data });
        });
      });
  }

  render() {
    const currentEvents = this.state.events.map(event => {
      return (
        <GranularEvent
          event={event}
          joinee={true}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return <div>{currentEvents}</div>;
  }
}

export default UserEvents;
