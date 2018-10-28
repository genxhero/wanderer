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
      return (
      <div className="signup-page">
          <div className="signup-container">
            <form onSubmit={this.handleSubmit} className="signup-form">
              <span className="signup-choice">
                SIGN UP!
              </span>
              {this.renderErrors()}
              <div className="signup-inputs">
                <h3 className="auth-label">Email</h3>
                <input type="email" value={this.state.email} onChange={this.update("email")} className="signup-input" />
                <h3 className="auth-label">Username</h3>
                <input type="text" value={this.state.username} onChange={this.update("username")} className="signup-input"/>
                <h3 className="auth-label">Password</h3>
                <input type="password" value={this.state.password} onChange={this.update("password")} className="signup-input"/>
                <h3 className="auth-label">Confirm Password:</h3>
                <input type="password" value={this.state.password2} onChange={this.update("password2")} className="signup-input" />
                <div className="signup-bottom">
                  <div id="excite">Adventure Awaits!</div>
                  <input className="signup-submit" type="submit" value="Allons-y!" />
                </div>
              </div>
            </form>
          </div>
        </div>);
    } else {
      return (
      <div className="signup-page">
          <div className="signup-container">
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <span className="signup-choice">
                LOG IN!
              </span>
              {this.renderErrors()}
            <h3 className="auth-label">Username</h3>
                <input type="text" value={this.state.username} onChange={this.update("username")} className="login-input" />
            <h3 className="auth-label">Password</h3>
                <input type="password" value={this.state.password} onChange={this.update("password")} className="signup-input" />
            <div className="signup-bottom">
              <div id="excite">Another Journey?</div>
              <input className="signup-submit" type="submit" value="Vamonos!" />
            </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(SessionForm);