import React, { Component } from "react";
import UsernameForm from "./chatComponents/UsernameForm";
import ChatScreen from "./chatComponents/ChatScreen";

class MainChatApp extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: "ChatScreen",
      currentUsername: ""
    };
  }
  componentWillMount() {
    this.setState({
      currentUsername: this.props.user.username
    })
  }

  render() {
    if(this.state.currentScreen ===  "WhatIsYourUserNameScreen") { 
    return <UsernameForm onSubmit={this.onUserNameSubmitted} />
    } else if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername}/>
    }
  }
}

export default MainChatApp;
