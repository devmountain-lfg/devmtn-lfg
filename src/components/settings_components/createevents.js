import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styling/publicpage.css";
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
      message: "",
      locationStreet_one: "",
      locationStreet_two: null,
      street_submit: "",
      locationCity: "",
      locationZip: 0,
      locationState: "",
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
        console.log(response.data);
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

  streetGenerator = (str_one, str_two) => {
    if (!str_two) {
      return str_one;
    } else {
      return `${str_one}, ${str_two}`;
    }
  };

  handleCreation = async () => {
    try {
      if (!this.state.activity_id) {
        return alert("Please select an activity!");
      }

      const {
        activity_id,
        event_date_start,
        event_date_end,
        is_public_event,
        max_player,
        message,
        locationStreet_one,
        locationStreet_two,
        locationCity,
        locationZip,
        locationState
      } = this.state;

      const body = {
        activityId: activity_id,
        eventStart: event_date_start,
        eventEnd: event_date_end,
        isPublic: is_public_event,
        maxPlayers: max_player,
        message: message,
        address1: locationStreet_one,
        address2: locationStreet_two,
        city: locationCity,
        state: locationState,
        zip: locationZip
      };

      const results = await axios.post("/create_event", body);
      console.log(results);
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
        <div className="login-logout" style={{ height: "700px" }}>
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
              value={this.state.event_date_start}
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
            required
            name="max_player"
          ></input>
          <textarea
            className="input-ref-large"
            type="text"
            placeholder="Event Description"
            onChange={this.handleChange}
            required
            name="message"
            cols="33"
            rows="5"
            style={{ height: "100px" }}
          ></textarea>
          <div className="event-address">
            <input
              type="text"
              placeholder="Street Address #1"
              name="locationStreet_one"
              className="input-ref-small"
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="Street Address #2"
              name="locationStreet_two"
              className="input-ref-small"
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="City"
              name="locationCity"
              className="input-ref-small"
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="State"
              name="locationState"
              className="input-ref-small"
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="ZIP"
              name="locationZip"
              className="input-ref-small"
              onChange={this.handleChange}
            ></input>{" "}
          </div>
          <button className="button-ref-medium" onClick={this.handleCreation}>
            Create Event
          </button>
          <Link
            to="/app/home_page"
            className="sign-up-link"
            style={{ textDecoration: "none" }}
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }
}

export default createEvent;
