import React from 'react';
import {Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './ForwarderNavigationSidebar.css';

function ForwarderNavigationSidebar() {
    return (
        <Container className="Forwarder-Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '100px'}}>
                    <h1>Spedytor</h1>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/zlecenia'>ZLECENIA SPEDYCJI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/doradztwa'>DORADZTWA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/przewoznicy'>PRZEWOŹNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/profil'>PROFIL</NavLink>
                <Nav.Link  className='Forwarder-Nav-Link' href="http://localhost:3000/">WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default ForwarderNavigationSidebar;