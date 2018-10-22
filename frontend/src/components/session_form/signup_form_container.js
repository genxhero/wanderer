import {connect} from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/session_util';
import SessionForm from './session_form';

const mapStateToProps = ({errors}) => {
  return {
    errors: errors.session,
    formType: 'Signup',
    navLink: <Link to="/login">Log In</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(registerUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);