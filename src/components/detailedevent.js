import React, { Component } from 'react'
import Navbar from './navbar'
import "../styling/publicpage.css";
import Event from "./individual_events/singleDetailEvent"
import axios from 'axios';
import moment from "moment";
import Map from "./map";

class detailedView extends Component {
    state = {
        events: [],
        creator: {},
      activities: [],
      event_id: null,
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
      locationState: ""
      }

  async componentDidMount() {
      console.log("detail",this.props)
    const eventId = this.props.match.params.event_id;
    await this.setState({ creator: this.props.user, event_id: eventId });
    await axios
      .get("/event_by_id", { params: { event_id: eventId } })
      .then(res => {
          console.log(res)
        const [data] = res.data;
        this.setState({
          activity_id: data.activity_id,
          activity_name: data.activity_name,
          event_date_start: moment(data.event_date_start).format(
            "YYYY-MM-DDTkk:mm"
          ),
          event_date_end: moment(data.event_date_end).format(
            "YYYY-MM-DDTkk:mm"
          ),
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
    console.log(this.state)
  }

    render() {
        console.log(this.props)
       return (
        <div className="publicpage-ref">
        <header className="header-ref">
        </header>
        <div className="event-title">Your Joined Events</div>
        <div className="my-events-ref">
          <Event {...this.props} userInfo={this.props.userInfo}  />
        </div>
        <div className="my-events-ref">
        <Map {...this.props}  />
        </div>
        <Navbar />
      </div>
       )
    }
  }
  export default detailedView;