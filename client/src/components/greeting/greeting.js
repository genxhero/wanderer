import React from "react";
import { Link, withRouter } from "react-router-dom";

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/login")
  }



  render () {
    const sessionLinks = () => (
      <div className="header-container">
        <Link to="/" className="header-link">
          <div>Wayfarer</div>
        </Link>
        <nav className="login-signup">
          <Link className="header-session-link" to="/login">Login</Link>
          &nbsp;or&nbsp;
      <Link className="header-session-link" to="/signup">Sign up!</Link>
        </nav>
      </div>
    );

    const personalGreeting = () => (
      <div className="header-container">
        <Link to="/" className="header-link">
          <div>Wayfarer</div>
        </Link>
        <hgroup className="header-group">
          <div className="header-name">Hi, {this.props.currentUser.username}!</div>
          <button className="header-button" onClick={this.handleClick}>
            Log Out
      </button>
        </hgroup>
      </div>
    );

    return this.props.currentUser.id ? personalGreeting() : sessionLinks();
  }
};

export default withRouter(Greeting);
