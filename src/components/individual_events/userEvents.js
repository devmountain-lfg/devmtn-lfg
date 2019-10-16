import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import GranularEvent from "./granular_event";

class UserEvents extends Component {
  constructor() {
    super();

    this.state = {
      myEvents: [],
      currentEvents: []
    };
  }

  async componentDidMount() {
    /* Promise.all needs an array and goes in order by index. 
    It returns an array of responses and those match to the index of Promise.all */
    const [{ data: myEvents }, { data: currentEvents }] = await Promise.all([
      axios.get(`/events`, {
        params: { user_id: this.props.userInfo.user_id }
      }),
      axios.get("/current_events")
    ]);

    this.setState({ myEvents, currentEvents });
  }

  render() {
    const myEvents = this.state.myEvents.map(event => {
      return (
        <GranularEvent
          event={event}
          joinee={true}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    const currentEvents = this.state.currentEvents.map(event => {
      return (
        <GranularEvent
          event={event}
          joinee={false}
          user_id={this.props.userInfo.user_id}
        />
      );
    });
    return (
      <div>
        <div>{myEvents}</div>
        <div>{currentEvents}</div>
      </div>
    );
  }
}

export default UserEvents;
