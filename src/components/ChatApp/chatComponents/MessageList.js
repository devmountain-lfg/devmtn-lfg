import React, { Component } from "react";
import reactDOM from "react-dom";

class MessageList extends Component {


  componentDidUpdate() {
    const node = reactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  render() {
    console.log(this.props.currentUser)
    const styles = {
      container: {
        overflowY: "scroll",
        flex: 1,
      },
      ul: {
        listStyle: "none"
      },
      li: {
        marginTop: 13,
        marginBottom: 13,
        display: "flex",
        flexDirection: "row",

      },
      senderUsername: {
        fontWeight: "bold"
      },
      message: {
        display: 'flex',
        fontSize: '15px',
        background: 'rgb(83, 158, 255)',
        height: 'auto',
        borderRadius: "7px",
        marginLeft: "5px",
        padding: "6px",
        color: 'white',
        maxWidth: '200px',
        overflow: 'hidden',
        flexWrap: 'wrap'
      }

    };

    return (
      <div

        style={{
          ...this.props.style,
          ...styles.container
        }}
      >
        <ul style={styles.ul} >
          {this.props.messages.map((message, index) => {
            if (message.text === "DELETED") {
              return (
                <li key={index} style={styles.li}>
                  <div>
                    <span style={styles.senderUsername}>
                      This User Has Been Deleted
                    </span>{" "}
                  </div>
                  <p style={styles.message}>Deleted Message</p>
                </li>
              );
            }
            return (
              <li key={index} style={styles.li} >
                <div
                  style={{ display: "flex", width: "100%", height: 'auto', justifyContent: "flex-start" }}>
                  <div>
                    <span style={styles.senderUsername}>{message.senderId}:</span>{" "}
                  </div>
                  <p style={styles.message}>{message.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MessageList;
