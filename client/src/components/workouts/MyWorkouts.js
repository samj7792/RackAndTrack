import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getWorkouts } from '../../actions/workouts';

import Button from 'react-bootstrap/Button';

const MyWorkouts = ({ workouts: { myWorkouts, loading }, getWorkouts }) => {
  useEffect(() => {
    getWorkouts();
  });

  const createdWorkouts = myWorkouts.map((workout) => (
    <li key={workout._id}>
      <h5>{workout.title}</h5>
      <p>{workout.description}</p>
    </li>
  ));

  return loading && myWorkouts === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3>Workouts Created By Me</h3>
      {myWorkouts !== null ? <ul>{createdWorkouts}</ul> : 'does not'}
    </Fragment>
  );
};

MyWorkouts.propTypes = {
  getWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

export default connect(mapStateToProps, { getWorkouts })(MyWorkouts);
