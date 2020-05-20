import React, { Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const TopNav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Nav>
      <Nav.Item>
        <Nav.Link onClick={logout} href='#!'>
          <i className='fas fas-sign-out-alt' /> <span>Logout</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav>
      <Nav.Item>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/login'>Log In</Nav.Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <Navbar className='mb-2' bg='dark' variant='dark'>
      <Navbar.Brand href='/' className='mr-auto'>
        <i className='fas fa-dumbbell' /> Rack and Track
      </Navbar.Brand>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Navbar>
  );
};

TopNav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(TopNav);
