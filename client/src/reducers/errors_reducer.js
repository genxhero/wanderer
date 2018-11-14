import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import vehicles from './vehicles_errors_reducer';

const errorsReducer = combineReducers({
  session,
  vehicles
});

export default errorsReducer;