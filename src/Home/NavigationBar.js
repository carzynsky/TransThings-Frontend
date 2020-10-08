import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <Navbar bg="#f7f6f6" expand="lg" style={{top: '15px', right: '15px'}}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavLink exact activeStyle={{ borderBottom: '2px solid rgb(255, 128, 82)'}} className="Nav-Link" to= '/'>Strona główna</NavLink>
        <NavLink activeStyle={{ borderBottom: '2px solid rgb(255, 128, 82)' }} className="Nav-Link" to= '/about'>Informacje</NavLink>
        <NavLink activeStyle={{ borderBottom: '2px solid rgb(255, 128, 82)' }} className="Nav-Link" to= '/contact'>Kontakt</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavigationBar;


