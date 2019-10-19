import React, { Component } from "react";
import axios from "axios";
import "../styling/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../styling/petercalendar.css";

const localizer = momentLocalizer(moment);

class calendarComponent extends Component {
  state = {
    events: []
  }
  getEvents = async () => {
    const response = await axios.get("/events", {
      params: { user_id: this.props.userInfo.user_id }
    });
    if (response.data.length > 0)
    {
      this.setState({
        events: response.data.map((item,i) => ({
          key: i,
          id: item.event_id,
          title: item.activity_name,
          start: new Date(item.event_date_start),
          end: new Date(item.event_date_end),
          userId: item.user_id,
          description: item.message
        }))
      });
    };

  }

  handleClick = async (props) => {
    this.props.history.push("/app/calendar");
  }

  componentDidMount() {
    this.getEvents();
  }

  handelEventClick = async (eventId) => {
    this.props.history.push(`/app/details/${eventId}`)
  }

  render() {
    return (
        <Calendar
          selectable
          events={this.state.events}
          showMultiDayTimes
          localizer={localizer}
          views={{ month: true}}
          onSelectSlot={this.handleClick}
          onSelectEvent={(event) => this.handelEventClick(event.id)}
        />
    );
  }
}

export default calendarComponent;
