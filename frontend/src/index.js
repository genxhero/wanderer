import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_util';

//Components
import configureStore from './store/store';
import Root from './root';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  //check for token
  if (localStorage.jwtToken) {
    //Set auth token header auth
    APIUtil.setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(APIUtil.setCurrentUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //Logout User
      store.dispatch(APIUtil.logoutUser());
      //Redirect to Login
      window.location.href = '/login';
    }
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
  serviceWorker.register();
});

//Commenting out the default code now that we're building our actual root

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();