import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const TopNav = () => (
  <Navbar bg='dark' variant='dark'>
    <Navbar.Brand href='#' className='mr-auto'>
      <i className='fas fa-dumbbell' /> Rack and Track
    </Navbar.Brand>
    <Nav>
      <Nav.Item>
        <Nav.Link href=''>Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href=''>Log In</Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);

export default TopNav;
