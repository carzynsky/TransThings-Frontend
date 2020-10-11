import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import history from '../history.js';
import './AdminNavigationSideBar.css';
import * as Cookies from 'js-cookie';

const AdminNavigationSideBar = () => {

    const handleLogout = (event) => {
        event.preventDefault();
        Cookies.remove('session');
        history.push('/');
        window.location.reload();
    }

    const handleBackHome = (event) => {
        event.preventDefault();
        history.push('/');
    }

    return (
        <Container className="Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '100px'}}>
                    <h1>Admin</h1>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/konfiguracja'>KONFIGURACJA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/uzytkownicy'>UŻYTKOWNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/kontrahenci'>KONTRAHENCI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/przewoznicy'>PRZEWOŹNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/magazyny'>MAGAZYNY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/statystyki'>STATYSTYKI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Admin-Nav-Link" to= '/admin/profil'>PROFIL</NavLink>
                <Nav.Link href='/' className='Admin-Nav-Link' onClick={handleBackHome}>POWRÓT</Nav.Link>
                <Nav.Link href="/" className='Admin-Nav-Link' onClick={handleLogout}>WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default AdminNavigationSideBar;