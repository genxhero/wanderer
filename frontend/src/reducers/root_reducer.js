import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
<<<<<<< HEAD
 import vehicles from "./vehicles_reducer";
=======
import maps from './maps_reducer';
>>>>>>> 41c4df49ea57c4df53f27b1babd91310f02a2e60

const rootReducer = combineReducers({
  session,
  errors,
<<<<<<< HEAD
  vehicles
=======
  maps
>>>>>>> 41c4df49ea57c4df53f27b1babd91310f02a2e60
});

export default rootReducer;