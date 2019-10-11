import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styling/publicpage.css";
import JoinedEvents from "../individual_events/joinedEvents";
import CreatedEvents from "../individual_events/createdEvents";

class ManageEvents extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userInfo: {},
      myCreatedEvents: [],
      myOtherEvents: []
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
        <div className="my-events-ref">
          <div className="event-title">Your Created Events</div>
          <div className="events-ref">
            <CreatedEvents userInfo={this.state.userInfo} />
          </div>
        </div>
        <div className="my-events-ref">
          <div className="event-title">Your Other Events</div>
          <JoinedEvents userInfo={this.state.userInfo} />
        </div>
        <footer className="footer-ref">
          <Link to="/app/home_page">
            <button className="home-button-ref">Home</button>
          </Link>
          <Link to="/app/settings">
            <button className="account-settings-ref">=</button>
          </Link>
        </footer>
      </div>
    );
  }
}

export default ManageEvents;
