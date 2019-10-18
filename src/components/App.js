import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";
import PublicPage from "./publicpage";
import MainChatApp from "./ChatApp/MainChatApp";
import CreateUser from "./settings_components/createuser";
import UserSetup from "./settings_components/usersetup";
import CreateEvents from "./settings_components/createevents";
import ChangeEvent from "./settings_components/changeevent";
import ManageEvents from "./settings_components/manageevents";
import Calendar from "./calendar";
import Homepage from "./homepage";
import Settings from "./settings_components/settings";
import Login from "./login";
import "../styling/reference.css";
import Reference from "../reference";
import Details from "./detailedevent";
import DeleteAccount from './settings_components/deleteaccount';

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
          render={(props) => {
            const { user } = this.state;
            if (user.username) {
              return <Homepage {...props} userInfo={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/details/:event_id"
          render={(props) => {
            const { user } = this.state;
            if (user.username) {
              return <Details {...props} userInfo={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/calendar"
          render={(props) => {
            const { user } = this.state;
            if (user.username) {
              return <Calendar {...props} userInfo={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/manage_events"
          render={props => {
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
          path="/app/change_event/:event_id"
          render={props => {
            const { user } = this.state;
            if (user.username) {
              return <ChangeEvent {...props} user={this.state.user} />;
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
        <Route
          path="/app/chat_room"
          render={(props) => {
            const { user } = this.state;
            if (user.username) {
              return <MainChatApp {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/public_page" />;
            }
          }}
        />
        <Route
          path="/app/delete_account"
          render={props => {
            const { user } = this.state;
            if (user.username) {
              return <DeleteAccount {...props} user={this.state.user} />;
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
          <Route
            path="/public_page"
            render={props => {
              return <PublicPage {...props} />;
            }}
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
