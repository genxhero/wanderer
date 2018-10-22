import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../util/session_util";
import SessionForm from "./session_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "Login",
    navLink: <Link to="/signup">Sign Up</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(loginUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
