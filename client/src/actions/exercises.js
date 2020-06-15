import axios from 'axios';
import { setAlert } from './alert';

import {
  MY_EXERCISES,
  EXERCISE_ERROR,
  LIKED_EXERCISES,
  GET_EXERCISES,
  GET_EXERCISE,
} from './types';

// Get all exercises
export const getAllExercises = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/exercises');

    dispatch({
      type: GET_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user's exercises
export const getMyExercises = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/exercises/mine');

    dispatch({
      type: MY_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user's liked exercises
export const getLikedExercises = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/exercises/liked');

    dispatch({
      type: LIKED_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a exercise
export const createExercise = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/exercises', formData, config);

    dispatch({
      type: GET_EXERCISE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Exercise Updated' : 'Exercise Created', 'success')
    );

    // if it's a new exercise, send user to dash
    if (!edit) history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
