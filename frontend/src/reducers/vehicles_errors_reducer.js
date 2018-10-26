import {
  GET_ERRORS,
  RECEIVE_VEHICLE,
  RECEIVE_VEHICLES
} from '../util/vehicles_util';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RECEIVE_VEHICLE:
      return [];
    case RECEIVE_VEHICLES:
      return [];
    default:
      return state;
  }
};