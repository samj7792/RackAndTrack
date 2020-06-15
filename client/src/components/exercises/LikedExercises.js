import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLikedExercises } from '../../actions/exercises';

import Spinner from '../layout/Spinner';

const LikedExercises = ({ likedExercises, loading, getLikedExercises }) => {
  useEffect(() => {
    getLikedExercises();
  }, []);

  const likedByMe = likedExercises.map((exercise) => (
    <li key={exercise._id}>
      <h5>{exercise.title}</h5>
      {/* <p>{exercise.description}</p> */}
    </li>
  ));

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : likedExercises.length === 0 ? (
    <p>You have not liked any exercises</p>
  ) : (
    <Fragment>{likedByMe}</Fragment>
  );
};

LikedExercises.propTypes = {
  likedExercises: PropTypes.array,
  getLikedExercises: PropTypes.func.isRequired,
};

export default connect(null, { getLikedExercises })(LikedExercises);
