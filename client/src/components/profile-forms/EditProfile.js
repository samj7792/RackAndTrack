import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    favWorkout: '',
    heightFt: '',
    heightIn: '',
    weight: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      favWorkout: loading || !profile.favWorkout ? '' : profile.favWorkout,
      heightFt: loading || !profile.heightFt ? '' : profile.heightFt,
      heightIn: loading || !profile.heightIn ? '' : profile.heightIn,
      weight: loading || !profile.weight ? '' : profile.weight,
    });
    // we want this to depend on when loading changes to false
  }, [loading]);

  const { favWorkout, heightFt, heightIn, weight } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <span>
        <h3>
          <i className='fas fa-user' /> Edit Your Profile
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
