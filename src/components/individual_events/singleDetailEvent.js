import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import moment from "moment";

class Event extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
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
          events:[{
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
          }]
      });
    })
    .catch(err => console.log(err));
  await this.setState({ loading: false });
  console.log(this.state)
}
  

  handleAttempt = () => {
    alert(
      "We'd love for you to participate in these activities. Please sign in or create an account in order to do so!"
    );
    this.props.history.push("/login");
  };

  render() {
    const currentEvents = this.state.events.map(event => {
      return (
        <div className="event" key={event.event_id}>
          <div className="event-top">
            <div className="creator-ref">
              <div className="creator">{event.creator_name}</div>
              <div className="people">
                {event.current_player_count}/{event.max_players}
              </div>
            </div>
            <h1 className="title">{event.activity_name}</h1>
            <div className="event-buttons">
              <button  className="button-ref-small" onClick={this.handleAttempt}>DM</button>
              <button  className="button-ref-small" onClick={this.handleAttempt}>Join</button>
            </div>
          </div>
          <div className="message">{event.event_message}</div>
          <div className="event-date"> Start Time:{" "} 
            {moment(event.event_date_start).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div className="event-date"> End Time:{" "} 
            {moment(event.event_date_end).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </div>
          <div className="event-location">{event.event_location}</div>
        </div>
      );
    });

    return <div>{currentEvents}</div>;
  }
}

export default Event;
