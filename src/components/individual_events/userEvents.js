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
    axios.get("/public_events").then(response => {
      this.setState({
        publicEvents: response.data
      });
    });
  }

  handleDelete = id => {
    axios
      .delete(`/delete_event/${id}`)
      .then(() => {
        alert("You have successfully deleted the event!");
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
        params: { eventId: id }
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
    if (this.state.publicEvents.length === 0) return <div>Loading...</div>;
    const myEvents = this.state.publicEvents.map(event => {
      return (
        <GranularEvent
          event={event}
          user_id={this.props.userInfo.user_id}
          handleJoin={this.handleJoin}
          handleCancel={this.handleCancel}
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
