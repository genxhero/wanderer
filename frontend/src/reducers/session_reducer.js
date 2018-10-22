import {
  RECEIVE_CURRENT_USER
} from '../util/session_util';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
    if (Object.values(action.payload).length === 0) {
      return _nullUser
    } else {
      return {
        id: action.payload.id,
        handle: action.payload.handle,
        username: action.payload.username };
      }
    default:
      return state;
  }
};

export default sessionReducer;