import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/" />
      )
  )} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/login" />
      )
  )} />
);


// This route first checks if there are vehicles in state, and if there are not, it checks to see if 
// there is a logged in user or not to determine where to redirect from distance

const ProtectedDistance = ({ component: Component, path, isVehicle, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
      isVehicle ? (
        <Component {...props} />
      ) : (
      loggedIn ? (
        <Redirect to="/vehicles" />
      ) : (
        <Redirect to="/addvehicle" />
      )
      )
  )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id),
  isVehicle: Boolean(Object.keys(state.vehicles).length !== 0)
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const ProtectedDistanceRoute = withRouter(connect(mapStateToProps)(ProtectedDistance));