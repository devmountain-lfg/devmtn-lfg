import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import GranularEvent from "./granular_event";

class UserEvents extends Component {
  constructor() {
    super();

    this.state = {
      publicEvents: []
    };
  }

  componentDidMount() {
    this.startUp();
  }

  startUp = () => {
    axios.get("/public_events").then(response => {
      this.setState({
        publicEvents: response.data
      });
    });
  };


  render() {
    if (this.state.publicEvents.length === 0) return <div>Loading...</div>;
    const myEvents = this.state.publicEvents.map(event => {
      return (
        <GranularEvent
          event={event}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return (
      <div>
        <div>{myEvents}</div>
      </div>
    );
  }
}

export default UserEvents;
