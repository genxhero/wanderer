import axios from "axios";
// import jwt_decode from 'jwt-decode';

// const $ = window.$;

export const RECEIVE_VEHICLE = 'RECEIVE_VEHICLE';
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveVehicle = payload => ({
    type: RECEIVE_VEHICLE,
    payload
});

export const receiveVehicles = payload => ({
  type: RECEIVE_VEHICLES,
  payload
})


//this is add vehicle online
// So the way this works is that the Authorization Header is already in place if the user logs in - that's what setAuthToken does in session_util
// So really, addVehicleOnline and addVehicleOffline are going to be the _same method_, but aimed at different routes
// As for the rest, you need to get the _data_ from the response before dispatching to the POJO action - as such, you want res.data, not just res
// Beyond that, axios requests are fairly simple - think of it like jQuery AJAX, a little bit

export const addVehicleOnline = (formData) => dispatch => (
  axios
    .post('/api/vehicles/addonline', formData)
    .then(res =>{
      let dummy ="you";
       debugger;
       let gummy = "bear";
      return dispatch(receiveVehicle(res.data));
    })
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
);

export const addVehicleOffline = (formData) => dispatch => (
  axios
    .post('/api/vehicles/addoffline', formData)
    .then(res => dispatch(receiveVehicle(res.data)))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
);

export const fetchUserVehicles = () => dispatch => (
  axios
    .get('/api/users/vehicles')
    .then(res => dispatch(receiveVehicles(res.data)))
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
);

export const fetchVehicle = (vehicleId) => dispatch => (
  axios
  .get(`/api/vehicles/${vehicleId}`)
  .then(res => dispatch(receiveVehicle(res.data)))
  .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
)
