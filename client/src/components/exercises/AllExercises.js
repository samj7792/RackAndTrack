import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllExercises } from '../../actions/exercises';
import Spinner from '../layout/Spinner';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AllExercises = ({
  exercises: { allExercises, loading },
  getAllExercises,
}) => {
  useEffect(() => {
    getAllExercises();
  }, []);

  const all = allExercises.map((exercise) => (
    <li key={exercise._id}>
      <h6>{exercise.title}</h6>
      {exercise.description}
      <Form>
        <Form.Check type='checkbox'>
          <Form.Check.Input type='checkbox' isValid />
          <Form.Check.Label>Like</Form.Check.Label>
        </Form.Check>
      </Form>
      <br />
    </li>
  ));

  return loading && allExercises.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3>All Exercises</h3>
      <ul>{all}</ul>
      <Button href='/dashboard'>Dashboard</Button>
    </Fragment>
  );
};

AllExercises.propTypes = {
  getAllExercises: PropTypes.func.isRequired,
  exercises: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(mapStateToProps, { getAllExercises })(AllExercises);
