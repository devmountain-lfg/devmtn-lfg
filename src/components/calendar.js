import React, { Component } from "react";
import axios from "axios";
import "../styling/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../styling/publicpage.css";
import Navbar from "./navbar"; 

const localizer = momentLocalizer(moment);

class calendar extends Component {
  state = {
    events: []
  };


  getEvents = async () => {
    const response = await axios.get("/events", {
      params: { user_id: this.props.userInfo.user_id }
    });
    if (response.data.length > 0) {
      this.setState({
        events: response.data.map(item => ({
          id: item.event_id,
          title: item.activity_name,
          start: new Date(item.event_date_start),
          end: new Date(item.event_date_end),
          userId: item.userId,
          description: item.description
        }))
      });
    }
  };

  handleClick = async (props) => {
    this.props.history.push("/app/home_page");
  }

  async componentDidMount() {
    this.getEvents();
  }

  // eventSelect = event => {
  // const r = window(`Start Time ${event.start}
  // End Time ${event.end}
  // Location (to be figured out) `);
  // };

  render() {
    return (
      <div className= "publicpage-ref">
      <div className="calendar-page">
        <Calendar
          selectable
          events={this.state.events}
          showMultiDayTimes
          localizer={localizer}
          step={30}
          onSelectEvent={event =>
           this.props.history.push(`/app/details/${event.id}`)
          }
        />
      </div>
      <Navbar/>
      </div>
    );
  }
}

export default calendar;
