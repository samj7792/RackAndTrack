import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreatedWorkouts from './CreatedWorkouts';
import LikedWorkouts from './LikedWorkouts';

import Button from 'react-bootstrap/Button';

const MyWorkouts = ({ workouts: { myWorkouts, likedWorkouts, loading } }) => {
  return (
    <Fragment>
      <h3>Workouts created by me</h3>
      <ul>
        <CreatedWorkouts myWorkouts={myWorkouts} loading={loading} />
      </ul>
      <h3>Workouts liked by me</h3>
      <ul>
        <LikedWorkouts likedWorkouts={likedWorkouts} loading={loading} />
      </ul>
    </Fragment>
  );
};

MyWorkouts.propTypes = {
  workouts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

export default connect(mapStateToProps)(MyWorkouts);
