import React, { Component } from "react";
import axios from "axios";
import "../styling/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

class calendar extends Component {
  
  State = {
    events: [
      {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2015, 3, 0),
        'end': new Date(2015, 3, 1)
      },
      {
        'title': 'Long Event',
        'start': new Date(2015, 3, 7),
        'end': new Date(2015, 3, 10)
      },
    
      {
        'title': 'DTS STARTS',
        'start': new Date(2016, 2, 13, 0, 0, 0),
        'end': new Date(2016, 2, 20, 0, 0, 0)
      },
    
      {
        'title': 'DTS ENDS',
        'start': new Date(2016, 10, 6, 0, 0, 0),
        'end': new Date(2016, 10, 13, 0, 0, 0)
      },

      {
      'id': 1,
      'title':"Test",
      'start': new Date('2019-9-24 6:00'),
      'end':new Date('2019-9-24 8:00'),
    }]
  
  };

// getEvents = async () => {
//   const response = await axios.get("/events");
//   console.log(response.data.length > 0) {
//     this.setState({
//      events: response.data.map(item => ({
//        id: item.id,
//        title: title,
//        start: new Date(item.start),
//        end: new Date(item.end),
//        userId: item.userId,
//        description: item.description
//      }))
//     });
//   }
// };

// async componentDidMount() {
//   this.getEvents();
// }

  render() {
    return (
      <div>
        <Calendar
        selectable
        events={this.state.events}
        showMultiDayTimes
        localizer={localizer}
        step={15}
        />

      </div>
    );
  }
}

export default calendar;
