import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.session
});

const SplashWelcome = () => (
  <div className="splash-container" id="splash-welcome">
    <h1 className="splash-title"> Welcome to Wayfarer!</h1>
    <span className="splash-info">A web app for facilitating adventure!</span>
    <span className="splash-info">Make trip planning a breeze!</span>
    <span className="splash-info">Explore new places!</span>
    <span className="splash-info">The open road awaits!</span>
 </div>   
);

const SplashInstructions = () => (
  <div className="splash-container">
    <h1 className="splash-title"> How To Use</h1>
    <span className="splash-info">
     Step 1: Enter information about
      <Link className="header-session-link" to="/addvehicle">
        your vehicle
      </Link>
    </span>
    <span className="splash-info">
      (You can
      <Link className="header-session-link" to="/login">
        Login
      </Link>
      or
      <Link className="header-session-link" to="/signup">
        Sign up!
      </Link>
      to save your vehicle
    information for later use!)
    </span>
    <span className="splash-info">
      Step 2: Tell us
      <ul>
        <li>Your destination</li>
        <li>How full your gas tank is</li>
        <li>How long you're willing to drive between food/sleep</li>
      </ul>
    </span>
    <span className="splash-info"> Step 3: Hit the button and let us do the rest</span>
    <span className="splash-info">The open road awaits!</span>
  </div>
);

const SplashEasterEgg = () => (
  <div className="splash-container">
    <p className="splash-info">Wow. You sure clicked that button an awful lot of times.  Well, congratulations, you've found me. It's a secret to everybody!</p>
  </div>
);
//clickcount % length
class Splash extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clickCount: 0
    }
    this.components = [<SplashWelcome />, <SplashInstructions />];
    this.carousel = this.carousel.bind(this);
  }

  carousel(){
    this.setState({ clickCount: this.state.clickCount + 1 });
  }
  render() {
    if (this.props.currentUser.id) {
      return (
        <Redirect to='/vehicles' />
      );
    } else {
      return (
        <div className="splash-page">
       
          {this.state.clickCount === 100 ? <SplashEasterEgg /> : this.components[this.state.clickCount % this.components.length]}
            <div className="splash-carousel-nav" onClick={this.carousel}></div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, null)(Splash);
