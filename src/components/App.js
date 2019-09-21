import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import PublicPage from "./publicpage";
import CreateUser from "./createuser";
import UserSetup from "./usersetup";
import CreateEvents from "./createevents";
import ManageEvents from "./manageevents";
import Calendar from "./calendar";
import Homepage from "./homepage";
import Settings from "./settings";
import Chats from "./chat";
import "../styling/reference.css";
import Reference from "../reference";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => props.history.push("/public_page")}
          />
          {/* <Route path="/app" component={AuthenticatedRouts} /> */}
          <Route path="/create_user" component={CreateUser} />
          <Route path="/Reference" component={Reference} />
          <Route path="/public_page" component={PublicPage} />
          <Route path="/home_page" component={Homepage} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/manage_events" component={ManageEvents} />
          <Route path="/create_event" component={CreateEvents} />
          <Route path="/user_setup" component={UserSetup} />
          <Route path="/chats" component={Chats} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
