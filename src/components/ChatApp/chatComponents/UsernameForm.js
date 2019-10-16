import  React, { Component } from "react";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  onChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="What is your username?"
            onChange={this.onChange}
          ></input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default UsernameForm;
