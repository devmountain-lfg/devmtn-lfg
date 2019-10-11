import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styling/publicpage.css";
import axios from "axios";
import moment from "moment";

class changeEvent extends Component {
  constructor() {
    super();

    this.state = {
      creator: {},
      activities: [],
      activity_id: null,
      activity_name: "",
      event_date_start: "",
      event_date_end: "",
      is_public_event: false,
      max_player: 0,
      message: "",
      locationStreet_one: "",
      locationStreet_two: null,
      locationCity: "",
      locationZip: 0,
      locationState: "",
      loading: true
    };
  }

  async componentDidMount() {
    await this.componentStartUp();
    await axios
      .get("/activities")
      .then(response => {
        this.setState({
          activities: response.data
        });
      })
      .catch(err => console.log(err));
  }

  async componentStartUp() {
    const eventId = this.props.match.params.event_id;
    await this.setState({ creator: this.props.user });
    await axios
      .get("/event", { params: { event_id: eventId } })
      .then(res => {
        const [data] = res.data;
        this.setState({
          activity_id: data.activity_id,
          activity_name: data.activity_name,
          event_date_start: moment(data.event_date_start).format("YYYY-MM-DDTkk:mm"),
          event_date_end: moment(data.event_date_end).format("YYYY-MM-DDTkk:mm"),
          is_public_event: data.public_event,
          max_player: data.max_players,
          message: data.event_message,
          locationStreet_one: data.event_address_1,
          locationStreet_two: data.event_address_2,
          locationCity: data.event_city,
          locationZip: data.event_zip,
          locationState: data.event_state
        });
      })
      .catch(err => console.log(err));
    await this.setState({ loading: false });
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
    if (this.state.loading) return <div>Loading...</div>;
    const activities = this.state.activities.map(activity => {
      return (
        <option value={activity.activity_id}>{activity.activity_name}</option>
      );
    });
    return (
      <div className="publicpage-ref">
        <div className="welcome-back">Change your event!</div>
        <div className="login-logout" style={{ height: "700px" }}>
          <select
            className="input-ref-large"
            name="activity_id"
            onChange={this.handleChange}
            defaultValue={this.state.activity_id}
          >
            {this.state.activity_name}
            {activities}
          </select>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Change start date
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
            Change end date
            <input
              className="input-ref-large"
              type="datetime-local"
              onChange={this.handleChange}
              required="required"
              name="event_date_end"
              value={this.state.event_date_end}
            ></input>
          </div>
          <select
            className="input-ref-large"
            name="is_public_event"
            onChange={e => this.setState({ is_public_event: e.target.value })}
            defaultValue={this.state.is_public_event}
          >
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
            value={this.state.max_player}
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
            value={this.state.message}
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
              value={this.state.locationStreet_one}
            ></input>{" "}
            <input
              type="text"
              placeholder="Street Address #2"
              name="locationStreet_two"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
              value={this.state.locationStreet_two}
            ></input>{" "}
            <input
              type="text"
              placeholder="City"
              name="locationCity"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
              value={this.state.locationCity}
            ></input>{" "}
            <input
              type="text"
              placeholder="State"
              name="locationState"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
              value={this.state.locationState}
            ></input>{" "}
            <input
              type="text"
              placeholder="ZIP"
              name="locationZip"
              style={{ border: "1px solid black", height: "25px" }}
              onChange={this.handleChange}
              value={this.state.locationZip}
            ></input>{" "}
          </div>
          {/* <Link to="/homepage"> */}
          <button
            className="button-ref-medium"
            onClick={this.handleChangeEvent}
            style={{ backgroundColor: "#E1DFE5" }}
          >
            Submit Changes
          </button>
          {/* </Link> */}
          <Link to="/app/manage_events" className="sign-up-link">
            Return to Manage Events
          </Link>
          <Link to="/app/home_page" className="sign-up-link">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }
}

export default changeEvent;
