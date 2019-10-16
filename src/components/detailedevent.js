import React, { Component } from 'react'
import Navbar from './navbar'
import "../styling/publicpage.css";
import Event from "./individual_events/singleEvent"
import axios from 'axios';
import moment from "moment";
;

class detailedView extends Component {
    state = {
        events: []
      }

  async componentDidMount() {
    const eventId = this.props.match.params.event_id;
    await this.setState({ creator: this.props.user, event_id: 1 });
    await axios
      .get("/event", { params: { event_id: 1 } })
      .then(res => {
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
  }

    render() {
       return (
        <div className="publicpage-ref">
        <header className="header-ref">
        </header>
        <div className="event-title">Your Joined Events</div>
        <div className="my-events-ref">
          <Event userInfo={this.props.userInfo} />
        </div>
        <Navbar />
      </div>
       )
    }
  }
  export default detailedView;