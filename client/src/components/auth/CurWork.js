import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CurWork = () => {
  return (
    <Fragment>
      <h1>[Current workout from DB]</h1>
      <Form>
        <Form.Row>
          <Form.Group className='col-6'>
            <InputGroup>
              <Form.Control type='number' placeholder='Weight' required />
              <InputGroup.Append>
                <InputGroup.Text>lbs</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group className='col-6'>
            <InputGroup>
              <Form.Control type='number' placeholder='Reps' required />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

export default CurWork;
