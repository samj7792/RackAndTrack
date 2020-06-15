import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMyExercises } from '../../actions/exercises';

import Spinner from '../layout/Spinner';

const CreatedExercises = ({ myExercises, loading, getMyExercises }) => {
  useEffect(() => {
    getMyExercises();
  }, []);

  const createdExercises = myExercises.map((exercise) => (
    <li key={exercise._id}>
      <h5>{exercise.title}</h5>
      {/* <p>{exercise.description}</p> */}
    </li>
  ));

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : myExercises.length === 0 ? (
    <p>You have not created any exercises</p>
  ) : (
    <Fragment>{createdExercises}</Fragment>
  );
};

CreatedExercises.propTypes = {
  myExercises: PropTypes.array,
  getMyExercises: PropTypes.func.isRequired,
};

export default connect(null, { getMyExercises })(CreatedExercises);
