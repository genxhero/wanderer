import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      letsgo: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.letsGo = this.letsGo.bind(this);
  }

  componentDidMount(){
    this.letsGo();
  }

  letsGo(){
    const LETS_GO_WORDS = ["Vamanos!",
      "Allons-y!",
      "Goazen!",
      "Idemo!",
      "Mennään!",
      "Andiamo!",
      "Iku zo!!",
      "Pùstiti!",
      "Birak!",
      "Yalla!",
      "Dimittas!",
      "Ambe!",
      "Pakawalan!",
      "Ha Tago!",
      "Songshou!",
      "Cia Mus!"
    ];
    this.setState
    ({
        letsgo: LETS_GO_WORDS[Math.floor(Math.random() * LETS_GO_WORDS.length)]
     });
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

  handleDemo(e) {
    this.setState({username: "DemoUser", password: "DemoDemo"});
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
                  <input className="signup-submit" type="submit" value={this.state.letsgo} />
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
              <input className="signup-submit" type="submit" value={this.state.letsgo} />
            </div>
            <input className="signup-submit" type="submit" onClick={this.handleDemo} value="Demo Login" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(SessionForm);