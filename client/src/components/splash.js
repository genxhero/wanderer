import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.session
});

class Splash extends React.Component {
  render() {
    if (this.props.currentUser.id) {
      return (
        <Redirect to='/vehicles' />
      );
    } else {
      return (
        <div className="splash-page">
           <div className="splash-container">
           <h1 className="splash-title"> Welcome to Wayfarer!</h1>
             <span className="splash-info">Find convenient gas stations</span>
             <span className="splash-info">Know where the food is</span>
             <span className="splash-info">Have a better idea of where to find lodging</span>
             <span className="splash-info">The open road awaits!</span>
           </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, null)(Splash);
