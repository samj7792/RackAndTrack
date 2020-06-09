import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllWorkouts } from '../../actions/workouts';
import Spinner from '../layout/Spinner';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AllWorkouts = ({
  workouts: { allWorkouts, loading },
  getAllWorkouts,
}) => {
  useEffect(() => {
    getAllWorkouts();
  }, []);

  console.log(allWorkouts);

  const all = allWorkouts.map((workout) => (
    <li key={workout._id}>
      <h6>{workout.title}</h6>
      {workout.description}
      <Form>
        <Form.Check type='checkbox'>
          <Form.Check.Input type='checkbox' isValid />
          <Form.Check.Label>Like</Form.Check.Label>
        </Form.Check>
      </Form>
      <br />
    </li>
  ));

  return loading && allWorkouts.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3>All Workouts</h3>
      <ul>{all}</ul>
      <Button href='/dashboard'>Dashboard</Button>
    </Fragment>
  );
};

AllWorkouts.propTypes = {
  getAllWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

export default connect(mapStateToProps, { getAllWorkouts })(AllWorkouts);
