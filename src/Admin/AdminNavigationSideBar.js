import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import history from '../history.js';
import * as Cookies from 'js-cookie';
import { getSessionCookie } from '../sessions';
import { AiOutlineUser, AiOutlinePoweroff } from 'react-icons/ai';
import { FaUserTie, FaWarehouse } from 'react-icons/fa';
import { RiTruckFill } from 'react-icons/ri';
import { BiStats, BiHomeSmile } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import './AdminNavigationSideBar.css';

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
                            <label className='Admin-Header' >Administrator</label>
                        </Col>
                    </Row>
                    <Row style={{textAlign: 'center', paddingTop: '0px'}}>
                        <Col>
                            <label>{getSessionCookie().login}</label>
                        </Col>
                    </Row>
                </div>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/uzytkownicy'>
                    <AiOutlineUser size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>Użytkownicy</span>
                </NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/kontrahenci'>
                    <FaUserTie  size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Kontrahenci</span>
                </NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/przewoznicy'>
                    <RiTruckFill  size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Przewoźnicy</span>
                </NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/magazyny'>
                    <FaWarehouse  size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Magazyny</span>
                </NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/statystyki'>
                    <BiStats  size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Statystyki</span>
                </NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', borderRadius: 3, color: '#202125', boxShadow: '2px 2px 10px -2px rgba(92,219,149,1)' }} className="Admin-Nav-Link" to= '/admin/profil'>
                    <CgProfile size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Profil</span>
                </NavLink>
                <NavLink className='Admin-Nav-Link' onClick={handleBackHome} to="/">
                    <BiHomeSmile size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Powrót</span>
                </NavLink>
                <NavLink className='Admin-Nav-Link' onClick={handleLogout} to="/">
                    <AiOutlinePoweroff size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Wyloguj</span>
                </NavLink>
            </Nav>
        </Container>
    );
}
export default AdminNavigationSideBar;