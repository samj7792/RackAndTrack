import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';

const DashboardActions = () => {
  return (
    <Fragment>
      <Button href='/edit-profile'>
        <i className='fas fa-user-circle' /> Edit Profile
      </Button>
    </Fragment>
  );
};

export default DashboardActions;
