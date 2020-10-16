import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import history from '../history.js';
import './AdminNavigationSideBar.css';
import * as Cookies from 'js-cookie';
import { getSessionCookie } from '../sessions';

const AdminNavigationSideBar = () => {

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
        <Container className="Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '50px'}}>
                    <Row>
                        <Col>
                            <div className='Icon-Avatar'>AC</div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '10px'}}>
                        <Col>
                            <label className='Admin-Header' >ADMIN</label>
                        </Col>
                    </Row>
                    <Row style={{textAlign: 'center', paddingTop: '0px'}}>
                        <Col>
                            <label>{getSessionCookie().login}</label>
                        </Col>
                    </Row>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/konfiguracja'>KONFIGURACJA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/uzytkownicy'>UŻYTKOWNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/kontrahenci'>KONTRAHENCI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/przewoznicy'>PRZEWOŹNICY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/magazyny'>MAGAZYNY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/statystyki'>STATYSTYKI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} className="Admin-Nav-Link" to= '/admin/profil'>PROFIL</NavLink>
                <Nav.Link href='/' className='Admin-Nav-Link' onClick={handleBackHome}>POWRÓT</Nav.Link>
                <Nav.Link href='/' className='Admin-Nav-Link' onClick={handleLogout}>WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default AdminNavigationSideBar;