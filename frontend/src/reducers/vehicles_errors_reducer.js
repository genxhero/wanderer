import {
  GET_ERRORS,
  RECEIVE_VEHICLE
} from '../util/vehicles_util';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RECEIVE_VEHICLE:
      return [];
    default:
      return state;
  }
};