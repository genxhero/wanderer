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
        <Redirect to="/addvehicle" />
      );
    }
  }
}

export default connect(mapStateToProps, null)(Splash);
