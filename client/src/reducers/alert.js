import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // add alert in payload to state
      return [...state, payload];
    case REMOVE_ALERT:
      // keep only alerts with ids not equal to payload
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
