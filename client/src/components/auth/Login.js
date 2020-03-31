import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  // creating our state for the form data to be filled by user
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // destructuring formData
  const { email, password } = formData;

  // onChange event for inputs
  const onChange = e =>
    // setting state, first spread formData to maintain values aready in state, then grab [e.target.name] to update the correct value in formData, e.target.value to grab what is entered in the input
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    console.log('Log in');
  };

  return (
    <Fragment>
      <br />
      <h1>Sign In</h1>
      <br />
      <p>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group>
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>
      <br />
      <p>
        Don't have an accout? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
