import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
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
      console.log('passwords do not match');
    } else {
      console.log(formData);
    }
  };

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
            required
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default Register;
