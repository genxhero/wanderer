import axios from "axios";
// import jwt_decode from 'jwt-decode';

const $ = window.$;

export const RECEIVE_VEHICLE = 'RECEIVE_VEHICLE';
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveVehicle = payload => ({
    type: RECEIVE_VEHICLE,
    payload
});


//this is add vehicle online
export const addVehicleOnline = (formData) => dispatch => (
  axios
    .post('/api/vehicles/addonline', formData)
    .then(res => {
    dispatch(receiveVehicle(res.data))
    }).catch(console.log("Error 420")));

window.addVehicleOnline = addVehicleOnline;
