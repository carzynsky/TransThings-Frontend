import React from 'react';
import {Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './ForwarderNavigationSidebar.css';
import history from '../history';
import * as Cookies from 'js-cookie';
import { getSessionCookie } from '../sessions';

function ForwarderNavigationSidebar() {

    const handleLogout = (event) => {
        event.preventDefault();
        Cookies.remove('session');
        history.push('/');
    }

    const handleBackHome = (event) => {
        event.preventDefault();
        history.push('/');
    }

    return (
        <Container className="Forwarder-Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '80px'}}>
                    <h1>Spedytor</h1>
                </div>
                <div style={{textAlign: 'center', paddingTop: '10px'}}>
                    <label>{getSessionCookie().login}</label>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/zlecenia'>ZLECENIA SPEDYCJI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/doradztwa'>DORADZTWA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/przewoznicy'>PRZEWOŹNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Forwarder-Nav-Link" to= '/spedytor/profil'>PROFIL</NavLink>
                <Nav.Link href='/' className='Forwarder-Nav-Link' onClick={handleBackHome}>POWRÓT</Nav.Link>
                <Nav.Link href='/' className='Forwarder-Nav-Link' onClick={handleLogout}>WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default ForwarderNavigationSidebar;