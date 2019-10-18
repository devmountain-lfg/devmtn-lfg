import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import Navbar from "../navbar";


class DeleteAccount extends Component {

  deleteAccount= async () => {
      try {
        await axios.delete('/delete_account');
        this.props.history.push("/public_page");
      } catch (error) {
          console.log(error)
      }
  }


  render() {

    return (
        <div className="publicpage-ref">
        <div className="warning-text">Are you sure you want to delete your account!?</div>
          <button className="button-ref-warning" onClick={this.deleteAccount}>
            Delete Account
          </button>
        <Navbar />
      </div>
    );
  }
}

export default DeleteAccount;
