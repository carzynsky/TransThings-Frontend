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
        {/* <NavLink exact activeStyle={{ border: '3px solid #05386B'}} className="Nav-Link" to= '/'>STRONA GŁÓWNA</NavLink> */}
        <NavLink exact activeStyle={{ border: '3px solid #5CDB95'}} className="Nav-Link" to= '/'>STRONA GŁÓWNA</NavLink>
        <NavLink activeStyle={{  border: '3px solid #5CDB95'}} className="Nav-Link" to= '/informacje'>INFORMACJE</NavLink>
        <NavLink activeStyle={{  border: '3px solid #5CDB95'}} className="Nav-Link" to= '/kontakt'>KONTAKT</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavigationBar;


