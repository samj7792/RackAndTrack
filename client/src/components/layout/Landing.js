import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <Container>
          <Row className='justify-content-center mt-5'>
            <h1 style={{ color: 'white' }}>Rack and Track</h1>
          </Row>
          <Row className='justify-content-center'>
            <h6 style={{ color: 'white' }}>
              Keep track of your workouts with a simple app
            </h6>
          </Row>
          <Row className='justify-content-center mt-3'>
            <Button
              className='mx-1'
              variant='primary'
              size='lg'
              href='/register'
            >
              Sign Up
            </Button>
            <Button
              className='mx-1'
              variant='secondary'
              size='lg'
              href='/login'
            >
              Log In
            </Button>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Landing;
