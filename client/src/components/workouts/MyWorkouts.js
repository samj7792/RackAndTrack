import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyWorkouts, getLikedWorkouts } from '../../actions/workouts';

import Button from 'react-bootstrap/Button';

const MyWorkouts = ({
  workouts: { myWorkouts, likedWorkouts, loading },
  getMyWorkouts,
  getLikedWorkouts,
}) => {
  useEffect(() => {
    getMyWorkouts();
    getLikedWorkouts();
  }, []);

  const createdWorkouts = myWorkouts.map((workout) => (
    <li key={workout._id}>
      <h5>{workout.title}</h5>
      {/* <p>{workout.description}</p> */}
    </li>
  ));

  const likedByMe = likedWorkouts.map((workout) => (
    <li key={workout._id}>
      <h5>{workout.title}</h5>
      {/* <p>{workout.description}</p> */}
    </li>
  ));

  // return loading && myWorkouts === null ? (
  //   <Spinner />
  // ) : (
  //   <Fragment>
  //     <h3>Workouts Created By Me</h3>
  //     {myWorkouts !== null ? <ul>{createdWorkouts}</ul> : 'does not'}
  //   </Fragment>
  // );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3>Workouts created by me</h3>
      <ul>{createdWorkouts}</ul>
      <h3>Workouts liked by me</h3>
      <ul>{likedByMe}</ul>
    </Fragment>
  );
};

MyWorkouts.propTypes = {
  getMyWorkouts: PropTypes.func.isRequired,
  getLikedWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

export default connect(mapStateToProps, { getMyWorkouts, getLikedWorkouts })(
  MyWorkouts
);
