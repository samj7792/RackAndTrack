import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreatedExercises from './CreatedExercises';
import LikedExercises from './LikedExercises';

import Button from 'react-bootstrap/Button';

const MyExercises = ({
  exercises: { myExercises, likedExercises, loading },
}) => {
  return (
    <Fragment>
      <h3>Exercises created by me</h3>
      <ul>
        <CreatedExercises myExercises={myExercises} loading={loading} />
      </ul>
      <h3>Exercises liked by me</h3>
      <ul>
        <LikedExercises likedExercises={likedExercises} loading={loading} />
      </ul>
      <Button href='/dashboard'>Dashboard</Button>
    </Fragment>
  );
};

MyExercises.propTypes = {
  exercises: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(mapStateToProps)(MyExercises);
