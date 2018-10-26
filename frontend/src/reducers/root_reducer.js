import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import maps from './maps_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  maps
});

export default rootReducer;