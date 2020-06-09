import axios from 'axios';
import { setAlert } from './alert';

import {
  MY_WORKOUTS,
  WORKOUT_ERROR,
  LIKED_WORKOUTS,
  GET_WORKOUTS,
} from './types';

// Get all workouts
export const getAllWorkouts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/workouts');

    dispatch({
      type: GET_WORKOUTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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
