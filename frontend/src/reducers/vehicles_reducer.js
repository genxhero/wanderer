import {RECEIVE_VEHICLE}  from "../util/vehicles_util";


export default (state= {}, action) =>{
  Object.freeze(state);
  switch(action.type) {
      case RECEIVE_VEHICLE:
      return action.payload
      default:
      return state;
  }
};