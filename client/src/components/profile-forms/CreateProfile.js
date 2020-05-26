import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    favWorkout: '',
    dob: '',
    heightFt: '',
    heightIn: '',
    weight: '',
  });

  const { favWorkout, dob, heightFt, heightIn, weight } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <span>
        <h3>
          <i className='fas fa-user' /> Create Your Profile
        </h3>
      </span>
      <small>* = required field</small>
      <br />
      <br />
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formGridFavWorkout'>
          <Form.Label>
            <strong>Enter your favorite workout!</strong>
          </Form.Label>
          <Form.Control
            placeholder='* Favorite Workout'
            name='favWorkout'
            value={favWorkout}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='formGridBirthday'>
          <Form.Label>
            <strong>Date of Birth</strong>
          </Form.Label>
          <Form.Control
            type='date'
            name='dob'
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridHeightFT'>
            <Form.Label>
              <strong>Height (feet)</strong>
            </Form.Label>
            <Form.Control
              type='number'
              placeholder='ft'
              name='heightFt'
              value={heightFt}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridHeightIN'>
            <Form.Label>
              <strong>Height (inches)</strong>
            </Form.Label>
            <Form.Control
              type='number'
              placeholder='in'
              name='heightIn'
              value={heightIn}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} />
        </Form.Row>

        <Form.Group>
          <Form.Label>
            <strong>Enter Your Current Weight</strong>
          </Form.Label>
          <Form.Control
            type='number'
            placeholder='Weight'
            name='weight'
            value={weight}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
