import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import WhosOnlineList from "./WhosOnlineList";


class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:e2d98014-702f-4f97-9c50-067d5f18eafc",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e2d98014-702f-4f97-9c50-067d5f18eafc/token"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser;
      })
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: "cc67e9ec-3146-4178-a9c7-77c0045b6e98",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onPresenceChange: () => this.forceUpdate()
          }
        });
        return currentUser;
      })
      .catch(error => console.error("error", error));

    axios
      .get("/chat_room", {
        params: { roomId: "cc67e9ec-3146-4178-a9c7-77c0045b6e98" }
      })
      .then(room => {
        this.setState({
          currentRoom: room
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.data.id
    });
  };

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error(error));
  };

  render() {
    if (!this.state.currentUser) return <div>Loading...</div>
    const styles = {
      container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      },
      chatContainer: {
        display: "flex",
        height: "100vh",
        width: "100vw"
      },
      whosOnlineListContainer: {
        width: "300px",
        flex: "none",
        padding: 20,
        backgroundColor: "#2c303b",
        color: "white"
      },
      chatListContainer: {
        padding: 20,
        width: "85vw",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        overflow: "hidden",
        fontFamily: "Heebo",
        overflowAnchor: 'auto'
      }
    };
    const users = this.state.currentUser.userStore.users

    return (
      <div style={styles.container}>
        <div className="chat-container">
          <aside className="whosOnlineListContainer">
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={users}
            />{" "}
          </aside>
          <section style={styles.chatListContainer}>
            <h2 className="welcome-back">Welcome to LFG Chat</h2>
            <MessageList
              currentUser={this.state.currentUser}
              user={this.props.user}
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />

            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
