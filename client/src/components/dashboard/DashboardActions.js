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
          <Button href='/my-exercises'>
            <i className='fas fa-circle' /> My Exercises
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button href='/all-exercises'>
            <i className='fas fa-search' /> Search Exercises
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button href='/create-exercise'>
            <i className='fas fa-plus' /> Create Exercise
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DashboardActions;
