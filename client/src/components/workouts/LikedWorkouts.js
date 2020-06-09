import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLikedWorkouts } from '../../actions/workouts';

import Spinner from '../layout/Spinner';

const LikedWorkouts = ({ likedWorkouts, loading, getLikedWorkouts }) => {
  useEffect(() => {
    getLikedWorkouts();
  }, []);

  const likedByMe = likedWorkouts.map((workout) => (
    <li key={workout._id}>
      <h5>{workout.title}</h5>
      {/* <p>{workout.description}</p> */}
    </li>
  ));

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : likedWorkouts.length === 0 ? (
    <p>You have not liked any workouts</p>
  ) : (
    <Fragment>{likedByMe}</Fragment>
  );
};

LikedWorkouts.propTypes = {
  likedWorkouts: PropTypes.array,
  getLikedWorkouts: PropTypes.func.isRequired,
};

export default connect(null, { getLikedWorkouts })(LikedWorkouts);
