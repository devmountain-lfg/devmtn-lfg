import React, { Component } from "react";
import axios from "axios";

class PublicPage extends Component {
  render() {
    return (
      <div className="parent_login">
        <header className="login_header">
          <input className="login"></input>
          <input className="logout"></input>
        </header>
      </div>
    );
  }
}

export default PublicPage;