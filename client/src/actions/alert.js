import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// dispatch (from thunk) allows us to dispatch more than one action type from this function
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  // randomly generate id
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
