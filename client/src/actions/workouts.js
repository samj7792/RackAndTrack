import axios from 'axios';
import { setAlert } from './alert';

import {
  MY_WORKOUTS,
  WORKOUT_ERROR,
  LIKED_WORKOUTS,
  GET_WORKOUTS,
  GET_WORKOUT,
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

// Create a workout
export const createWorkout = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/workouts', formData, config);

    dispatch({
      type: GET_WORKOUT,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Workout Updated' : 'Workout Created', 'success'));

    // if it's a new workout, send user to dash
    if (!edit) history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
