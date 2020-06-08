import axios from 'axios';
import { setAlert } from './alert';

import { MY_WORKOUTS, WORKOUT_ERROR, LIKED_WORKOUTS } from './types';

// Get user's workouts
export const getMyWorkouts = () => async (dispatch) => {
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

// Get user's liked workouts
export const getLikedWorkouts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/workouts/liked');

    dispatch({
      type: LIKED_WORKOUTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
