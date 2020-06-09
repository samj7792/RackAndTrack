import React, { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const DashboardActions = () => {
  return (
    <Fragment>
      <Row>
        <Col>
          <Button href='/edit-profile'>
            <i className='fas fa-user-circle' /> Edit Profile
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button href='/my-workouts'>
            <i className='fas fa-circle' /> My Workouts
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button href='/all-workouts'>
            <i className='fas fa-search' /> Search Workouts
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button href='/create-workout'>
            <i className='fas fa-plus' /> Create Workout
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DashboardActions;
