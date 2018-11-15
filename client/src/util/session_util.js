import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const GET_SESSION_ERRORS = "GET_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const setAuthToken = token => {
  if (token) {
    // This applies the authentication to all the headers - no more having to Postman hack it in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header - so that when you aren't authorized, it doesn't authorize you
    delete axios.defaults.headers.common['Authorization'];
  }
};

//Register User function
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_SESSION_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User function - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_SESSION_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};