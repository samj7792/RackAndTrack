import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // creating our state for the form data to be filled by user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // destructuring formData
  const { name, email, password, password2 } = formData;

  // onChange event for inputs
  const onChange = e =>
    // setting state, first spread formData to maintain values aready in state, then grab [e.target.name] to update the correct value in formData, e.target.value to grab what is entered in the input
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    // check if passwords match
    if (password !== password2) {
      // call setAlert action
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <br />
      <h1>Sign Up</h1>
      <br />
      <p>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <br />
      <p>
        Already have an accout? <Link to='/login'>Log In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
