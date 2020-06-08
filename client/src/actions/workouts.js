import axios from 'axios';
import { setAlert } from './alert';

import { MY_WORKOUTS, WORKOUT_ERROR } from './types';

// Get user's workouts
export const getWorkouts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/workouts/mine');

    dispatch({
      type: MY_WORKOUTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
