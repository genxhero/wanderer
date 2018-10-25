import React from "react";
import { Link } from "react-router-dom";

const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div className="header-container">
      <nav className="login-signup">
        <Link className="header-session-link" to="/login">Login</Link>
        &nbsp;or&nbsp;
      <Link className="header-session-link" to="/signup">Sign up!</Link>
      </nav>
    </div>
  );
  const personalGreeting = () => (
    <div className="header-container">
      <hgroup className="header-group">
        <div className="header-name">Hi, {currentUser.username}!</div>
        <button className="header-button" onClick={logout}>
          Log Out
      </button>
      </hgroup>
    </div>
  
  );

  return currentUser.id ? personalGreeting() : sessionLinks();
};

export default Greeting;
