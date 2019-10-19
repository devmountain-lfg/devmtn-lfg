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
          id: item.id,
          title: item.activity_name,
          start: new Date(item.event_date_start),
          end: new Date(item.event_date_end),
          userId: item.userId,
          description: item.description
        }))
      });
    };

  }

  handleClick = async (props) => {
    this.props.history.push("/app/calendar");
  }

  async componentDidMount() {
    this.getEvents();
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
        />
    );
  }
}

export default calendarComponent;
