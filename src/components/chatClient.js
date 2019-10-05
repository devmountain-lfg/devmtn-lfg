import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNNECTED } from "./chatEvents";
const socketUrl = "http://localhost:3231";

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("connected");
    });
    this.setState({ socket });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNNECTED);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    return <div></div>;
  }
}
