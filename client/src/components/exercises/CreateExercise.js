import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createExercise } from '../../actions/exercises';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateExercise = ({ createExercise, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createExercise(formData, history);
  };

  return (
    <Fragment>
      <h3>Create Your Exercise</h3>
      <small>* = required field</small>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formTitle'>
          <Form.Label>Exercise Title</Form.Label>
          <Form.Control
            type='text'
            placeholder=' * Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='formDescription'>
          <Form.Label>Exercise Description</Form.Label>
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

CreateExercise.propTypes = {
  createExercise: PropTypes.func.isRequired,
};

export default connect(null, { createExercise })(CreateExercise);
