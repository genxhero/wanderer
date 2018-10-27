import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
 import vehicles from "./vehicles_reducer";
import maps from './maps_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  vehicles,
  maps
});

export default rootReducer;