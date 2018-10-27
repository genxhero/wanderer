import {
  RECEIVE_MAP_DATA
} from '../util/map_util';

const mapsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MAP_DATA:
      return action.payload
    default:
      return state;
  }
};

export default mapsReducer;