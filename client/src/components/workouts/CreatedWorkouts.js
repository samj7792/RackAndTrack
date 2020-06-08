import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMyWorkouts } from '../../actions/workouts';

import Spinner from '../layout/Spinner';

const CreatedWorkouts = ({ myWorkouts, loading, getMyWorkouts }) => {
  useEffect(() => {
    getMyWorkouts();
  }, []);

  const createdWorkouts = myWorkouts.map((workout) => (
    <li key={workout._id}>
      <h5>{workout.title}</h5>
      {/* <p>{workout.description}</p> */}
    </li>
  ));

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : myWorkouts === null ? (
    'You have not created any workouts'
  ) : (
    <Fragment>{createdWorkouts}</Fragment>
  );
};

CreatedWorkouts.propTypes = {
  myWorkouts: PropTypes.array,
  getMyWorkouts: PropTypes.func.isRequired,
};

export default connect(null, { getMyWorkouts })(CreatedWorkouts);
