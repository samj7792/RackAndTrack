import {
  EXERCISE_ERROR,
  MY_EXERCISES,
  LIKED_EXERCISES,
  GET_EXERCISES,
  GET_EXERCISE,
} from '../actions/types';

const initialState = {
  exercise: null,
  allExercises: [],
  myExercises: [],
  likedExercises: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXERCISE:
      return {
        ...state,
        exercise: payload,
        loading: false,
      };
    case GET_EXERCISES:
      return {
        ...state,
        allExercises: payload,
        loading: false,
      };
    case MY_EXERCISES:
      return {
        ...state,
        myExercises: payload,
        loading: false,
      };
    case LIKED_EXERCISES:
      return {
        ...state,
        likedExercises: payload,
        loading: false,
      };
    case EXERCISE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
