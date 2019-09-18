import React, { Component } from "react";
import axios from "axios";
import MainButton from "./styling/material_ui/buttons/mainbutton";


class homepage extends Component {
  


  render() {
    return (
      <div>
        <MainButton>
          This is the main button
        </MainButton>
        <h1>Homepage</h1>
      </div>
    );
  }
}

export default homepage;
