import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    if (this.props.formType === 'Signup') {
      return <div className="signup-page">
          <div className="signup-container">
            <form onSubmit={this.handleSubmit} className="signup-form">
              <span className="signup-choice">
                Please {this.props.formType} or {this.props.navLink}
              </span>
              {this.renderErrors()}
              <div className="signup-inputs">
                <h3>Email</h3>
                <input type="email" value={this.state.email} onChange={this.update("email")} className="signup-input" />
                <h3>Username:</h3>
                <input type="text" value={this.state.username} onChange={this.update("username")} className="signup-input"/>
                <h3>Password:</h3>
                <input type="password" value={this.state.password} onChange={this.update("password")} className="signup-input"/>
                <h3>Confirm Password:</h3>
                <input type="password" value={this.state.password2} onChange={this.update("password2")} className="signup-input" />
                <div className="signup-bottom">
                  <div id="excite">Adventure Awaits!</div>
                  <input className="signup-submit" type="submit" value="Allons-y!" />
                </div>
              </div>
            </form>
          </div>
        </div>;
    } else {
      return (
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form-box">
            Welcome to Wayfarer!
            Please {this.props.formType} or {this.props.navLink}
            {this.renderErrors()}
              <label>Username:
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="login-input"
                />
              </label>
              <label>Password:
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                />
              </label>
              <input className="session-submit" type="submit" value={this.props.formType} />
          </form>
        </div>
      );
    }
  }
}

export default withRouter(SessionForm);