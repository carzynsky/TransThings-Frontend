import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <Navbar bg="#f7f6f6" expand="lg" style={{top: '30px', right: '15px'}}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavLink exact activeStyle={{ backgroundColor: '#05386B', color: '#5CDB95'}} className="Nav-Link" to= '/'>STRONA GŁÓWNA</NavLink>
        <NavLink activeStyle={{ backgroundColor: '#05386B', color: '#5CDB95'}} className="Nav-Link" to= '/about'>INFORMACJE</NavLink>
        <NavLink activeStyle={{ backgroundColor: '#05386B', color: '#5CDB95'}} className="Nav-Link" to= '/contact'>KONTAKT</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavigationBar;


