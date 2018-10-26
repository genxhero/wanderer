import {RECEIVE_VEHICLE, RECEIVE_VEHICLES}  from "../util/vehicles_util";


export default (state= {}, action) =>{
  Object.freeze(state);
  switch(action.type) {
      case RECEIVE_VEHICLE:
        return action.payload
      case RECEIVE_VEHICLES:
        return action.payload
      default:
        return state;
  }
};