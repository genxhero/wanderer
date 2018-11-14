import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.session
});

const SplashWelcome = () => (
  <div className="splash-container">
    <h1 className="splash-title"> Welcome to Wayfarer!</h1>
    <span className="splash-info">Find convenient gas stations</span>
    <span className="splash-info">Know where the food is</span>
    <span className="splash-info">Have a better idea of where to find lodging</span>
    <span className="splash-info">The open road awaits!</span>
 </div>   
);

const SplashInstructions = () => (
  <div className="splash-container">
    <h1 className="splash-title"> How To Use</h1>
    <span className="splash-info">1) </span>
    <span className="splash-info"> </span>
    <span className="splash-info">Have a better idea of where to find lodging</span>
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
    this.components = [<SplashInstructions/>, <SplashWelcome/>];
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
            <button className="splash-carousel-nav" onClick={this.carousel}>More</button>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, null)(Splash);
