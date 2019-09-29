import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/publicpage.css";
import axios from "axios";

class createEvent extends Component {
  constructor() {
    super();

    this.state = {
      activities: [],
      creator: {},
      activity_id: null,
      event_date_start: "",
      event_date_end: "",
      is_public_event: false,
      max_player: 0,
      created_event: false
    };
  }

  componentDidMount() {
    this.componentStartUp();
  }

  componentStartUp() {
    axios
      .get("/activities")
      .then(response => {
        this.setState({
          activities: response.data
        });
      })
      .catch(err => console.log(err));
    this.setState({ creator: this.props.user });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreation = async () => {
    try {
      if (!this.state.activity_id) {
        alert("Please select an activity!");
      }
      const {
        activity_id,
        event_date_start,
        event_date_end,
        is_public_event,
        max_player
      } = this.state;
      const creator_id = this.state.creator.user_id;
      const body = {
        activity_id,
        event_date_start,
        event_date_end,
        is_public_event,
        max_player,
        creator_id
      };
      await axios.post("create_new_event", body);
      this.setState({ created_event: true });
      alert("Event successfully created!");
      this.props.history.push("/app/home_page");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  render() {
    const activities = this.state.activities.map(activity => {
      return (
        <option value={activity.activity_id}>{activity.activity_name}</option>
      );
    });

    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Let's create your event!</div>
        <div className="login-logout">
          <select
            className="input-ref-large"
            name="activity_id"
            onChange={this.handleChange}
          >
            <option value="" disabled selected>
              Select your activity
            </option>
            {activities}{" "}
          </select>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Choose start date
            <input
              className="input-ref-large"
              type="datetime-local"
              onChange={this.handleChange}
              required="required"
              name="event_date_start"
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Choose end date
            <input
              className="input-ref-large"
              type="datetime-local"
              onChange={this.handleChange}
              required="required"
              name="event_date_end"
            ></input>
          </div>
          <select
            className="input-ref-large"
            name="is_public_event"
            onChange={e => this.setState({ is_public_event: e.target.value })}
          >
            <option value="" disabled selected>
              Public activity?{" "}
            </option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
          <input
            className="input-ref-large"
            type="number"
            placeholder="Max number of players"
            onChange={this.handleChange}
            required="required"
            name="max_player"
          ></input>
          {/* <Link to="/homepage"> */}
          <button className="button-ref-medium" onClick={this.handleCreation}>
            Create Event
          </button>
          {/* </Link> */}
          <Link to="/app/home_page" className="sign-up-link">
            Go back home
          </Link>
        </div>
      </div>
    );
  }
}

export default createEvent;
