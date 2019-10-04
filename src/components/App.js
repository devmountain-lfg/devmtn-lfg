import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
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
import Login from "./login";
import "../styling/reference.css";
import Reference from "../reference";

class AuthenticatedRoutes extends React.Component {
  state = {
    user: {},
    loading: true
  };

  componentDidMount() {
    axios
      .get("/me")
      .then(response => {
        this.setState({
          user: response.data,
          loading: false
        });
        console.log(this.state.user);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <div>
        <Route
          path="/app/home_page"
          render={() => {
            const { user } = this.state;
            if (user.username) {
              return <Homepage userInfo={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/calendar"
          render={() => {
            const { user } = this.state;
            if (user.username) {
              return <Calendar userInfo={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/manage_events"
          render={(props) => {
            const { user } = this.state;
            if (user.username) {
              return <ManageEvents {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/create_event"
          render={props => {
            const { user } = this.state;
            if (user.username) {
              return <CreateEvents {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/user_setup"
          render={() => {
            const { user } = this.state;
            if (user.username) {
              return <UserSetup />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/chats"
          render={() => {
            const { user } = this.state;
            if (user.username) {
              return <Chats />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/settings"
          render={() => {
            const { user } = this.state;
            if (user.username) {
              return <Settings />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => props.history.push("/public_page")}
          />
          <Route path="/app" component={AuthenticatedRoutes} />
          <Route path="/create_user" component={CreateUser} />
          <Route path="/Reference" component={Reference} />
          <Route path="/public_page" component={PublicPage} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
