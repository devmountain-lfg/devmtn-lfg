import React, { Component } from "react";
import { Link } from 'react-router-dom'

class WhosOnlineList extends Component {

  renderUsers() {
    const users = Object.keys(this.props.users).map(key => this.props.users[key])
    const displayUsers = users.filter((user) => {
      return user.name !== "DELETED"
    });


    return (
      <ul style={{ fontFamily: 'Heebo' }}>
        <Link to="/app/home_page" style={{ textDecoration: 'none' }}>
          <button className="button-ref-small" style={{ marginBottom: "5px" }}>Home</button>
        </Link>
        Who's Online List
        {displayUsers.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p>Loading...</p>;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    const styles = {
      li: {
        display: "flex",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
        fontFamily: 'Heebo'
      },
      div: {
        borderRadius: "50%",
        width: 11,
        height: 11,
        marginRight: 10,
        fontFamily: 'Heebo'
      }
    };
    return (
      <li style={styles.li}>
        <div
          style={{
            ...styles.div,
            backgroundColor:
              this.props.presenceState === "online" ? "#539eff" : "#414756"
          }}
        />
        {this.props.children}
      </li>
    );
  }
}

export default WhosOnlineList;
