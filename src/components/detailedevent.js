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
      }

      async componentDidMount() {
        console.log("detail",this.props)
      const eventId = this.props.match.params.event_id;
      await this.setState({ creator: this.props.user, event_id: eventId });
      await axios
        .get("/event_by_id", { params: { event_id: eventId } })
        .then(res => {
          const [data] = res.data;
          this.setState({
              events:{
            activity_id: data.creator_id,
            creator_name: data.creator_name,
            activity_name: data.activity_name,
            event_date_start: moment(data.event_date_start).format(
              "YYYY-MM-DDTkk:mm"
            ),
            event_date_end: moment(data.event_date_end).format(
              "YYYY-MM-DDTkk:mm"
            ),
            is_public_event: data.public_event,
            max_players: data.max_players,
            current_player_count: data.current_player_count,
            event_message: data.event_message,
            event_location: data.event_location
              }
          });
        })
        .catch(err => console.log(err));
      await this.setState({ loading: false });
      
    }

    render() {
       console.log(this.state.events.event_location)
       return (
        <div className="publicpage-ref">
        <header className="header-ref">
        </header>
        <div className="event-title">Your Joined Events</div>
        <div className="my-events-ref">
          <Event {...this.props} userInfo={this.props.userInfo} events={this.state.events} />
        </div>
        <div className="my-events-ref">
        <Map location={this.state.events.event_location}  />
        </div>
        <Navbar />
      </div>
       )
    }
  }
  export default detailedView;