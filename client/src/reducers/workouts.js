import { WORKOUT_ERROR, MY_WORKOUTS, LIKED_WORKOUTS } from '../actions/types';

const initialState = {
  workout: null,
  myWorkouts: [],
  likedWorkouts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MY_WORKOUTS:
      return {
        ...state,
        myWorkouts: payload,
        loading: false,
      };
    case LIKED_WORKOUTS:
      return {
        ...state,
        likedWorkouts: payload,
        loading: false,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
