import React, { Component } from "react";
import "../../styling/publicpage.css";
import JoinedEvents from "../individual_events/joinedEvents";
import CreatedEvents from "../individual_events/createdEvents";
import Navbar from "../navbar";

class ManageEvents extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userInfo: {}
    };
  }

  componentDidMount() {
    this.componentStartUp();
  }

  async componentStartUp() {
    await this.setState({ userInfo: this.props.user });
    await this.setState({ loading: false });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Manage Events Here!</div>
        <div className="calendar-events">
          <div className="my-events-ref">
            <div className="event-title">Your Created Events</div>

            <CreatedEvents userInfo={this.state.userInfo} />
          </div>
          <div className="my-events-ref">
            <div className="event-title">Your Joined Events</div>
            <JoinedEvents userInfo={this.state.userInfo} />
          </div>
        </div>
        <Navbar />
      </div>
    );
  }
}

export default ManageEvents;
