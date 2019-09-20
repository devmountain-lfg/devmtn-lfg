import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import "./styling/reference.css";
import { Checkbox } from "@material-ui/core";

function Reference(props) {
  return (
    <div className="main-container-ref">
      <AppBar style={{ backgroundColor: "#717275", height: "70px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu id="simple-menu" keepMounted>
            <MenuItem>Change Account Settings</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            style={{ display: "flex", margin: "30px" }}
          ></Typography>

          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className="body-ref">
        <div className="all-inputs-ref">
          <input
            className="input-ref-small"
            placeholder="input-ref-small"
          ></input>
          <input
            className="input-ref-medium"
            placeholder="input-ref-medium"
          ></input>
          <input
            className="input-ref-large"
            placeholder="input-ref-large"
          ></input>
        </div>
        <div className="all-inputs-ref">
          <input
            className="input-ref-small"
            placeholder="input-ref-small"
          ></input>
          <input
            className="input-ref-medium"
            placeholder="input-ref-medium"
          ></input>
          <input
            className="input-ref-large"
            placeholder="input-ref-large"
          ></input>
        </div>
        <div className="all-inputs-ref">
          <input
            className="input-ref-small"
            placeholder="input-ref-small"
          ></input>
          <input
            className="input-ref-medium"
            placeholder="input-ref-medium"
          ></input>
          <input
            className="input-ref-large"
            placeholder="input-ref-large"
          ></input>
        </div>
        <div className="all-buttons-ref">
          <button className="button-ref-small"></button>^button-ref-small^
          <button className="button-ref-medium">button-ref-medium</button>
          <button className="button-ref-large">button-ref-large</button>
        </div>
        <div className="all-dropdowns-ref">
          <select className="dropdown-ref">
            <option>dropdown-ref</option>
          </select>
        </div>
        <div className="all-checkboxs-ref">
          <input className="checkbox-ref" type="checkbox"></input>
        </div>
      </div>
    </div>
  );
}

export default Reference;
