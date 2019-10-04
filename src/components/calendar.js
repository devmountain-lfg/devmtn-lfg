import React, { Component } from "react";
import axios from "axios";
import "../styling/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../styling/petercalendar.css";

const localizer = momentLocalizer(moment);

class calendar extends Component {
  state = {
    events: []
  };
  getEvents = async () => {
    const response = await axios.get(`/events/${this.props.userInfo.user_id}`);

    if (response.data.length > 0) {
      this.setState({
        events: response.data.map(item => ({
          id: item.id,
          title: item.activity_name,
          start: new Date(item.event_date_start),
          end: new Date(item.event_date_end),
          userId: item.userId,
          description: item.description
        }))
      });
    }
  };

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
      <div className="calendarWrapper">
        <Calendar
          selectable
          events={this.state.events}
          showMultiDayTimes
          localizer={localizer}
          step={15}
          onSelectEvent={event =>
            alert(`Start Time ${event.start}
          End Time ${event.end}
          Location "("to be figured out")"`)
          }
        />
      </div>
    );
  }
}

export default calendar;
