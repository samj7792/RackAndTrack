import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createWorkout } from '../../actions/workouts';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateWorkout = ({ createWorkout, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createWorkout(formData, history);
  };

  return (
    <Fragment>
      <h3>Create Your Workout</h3>
      <small>* = required field</small>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formTitle'>
          <Form.Label>Workout Title</Form.Label>
          <Form.Control
            type='text'
            placeholder=' * Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='formDescription'>
          <Form.Label>Workout Description</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

CreateWorkout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
};

export default connect(null, { createWorkout })(CreateWorkout);
