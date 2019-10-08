import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styling/publicpage.css";
import axios from "axios";

class changeEvent extends Component {
  constructor() {
    super();

    this.state = {
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

  async componentStartUp() {
    const eventId = this.props.match.params.event_id;
    await this.setState({creator: this.props.user});
    axios
      .get("/event", {params: {event_id: eventId}})
      .then(response => {
        console.log('this is the response from startup', response.data);
        // this.setState({
        //   activity_id: null,
        //   event_date_start: "",
        //   event_date_end: "",
        //   is_public_event: false,
        //   max_player: 0,
        //   message: "",
        //   locationStreet_one: "",
        //   locationStreet_two: null,
        //   street_submit: "",
        //   locationCity: "",
        //   locationZip: 0,
        //   locationState: "",
        //   created_event: false
        //     });
      })
      .catch(err => console.log(err));
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

  handleChangeEvent = async () => {
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
              height: "150px",
              width: "350px"
            }}
          >
            <input
              type="text"
              placeholder="Street Address #1"
              name="locationStreet_one"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="Street Address #2"
              name="locationStreet_two"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="City"
              name="locationCity"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="State"
              name="locationState"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
            ></input>{" "}
            <input
              type="text"
              placeholder="ZIP"
              name="locationZip"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
            ></input>{" "}
          </div>
          {/* <Link to="/homepage"> */}
          <button
            className="button-ref-medium"
            onClick={this.handleChangeEvent}
            style={{ backgroundColor: "#E1DFE5" }}
          >
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

export default changeEvent;
