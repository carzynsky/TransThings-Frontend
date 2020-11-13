import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getSessionCookie } from '../sessions';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaHandsHelping, FaWarehouse } from 'react-icons/fa';
import { RiTruckFill } from 'react-icons/ri';
import { BiTask, BiHomeSmile } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import history from '../history.js';
import * as Cookies from 'js-cookie';
import './ForwarderNavigationSidebar.css';

const ForwarderNavigationSidebar = () => {
    
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
        <Container className="Navigation-Container" style={{ height: 762 }}>
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '50px'}}>
                    <Row>
                        <Col>
                            <div className='Icon-Avatar'>AC</div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '10px'}}>
                        <Col>
                            <label className='Admin-Header' >Spedytor</label>
                        </Col>
                    </Row>
                    <Row style={{textAlign: 'center', paddingTop: '0px'}}>
                        <Col>
                            <label>{getSessionCookie().login}</label>
                        </Col>
                    </Row>
                </div>
                {/* activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} */}
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/spedytor/zlecenia'>
                    <BiTask color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Zlecenia spedycji</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/spedytor/konsultacje-spedycji'>
                    <FaHandsHelping color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Konsultacje spedycji</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/spedytor/konsultacje-spedycji'>
                    <RiTruckFill color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Przewoźnicy</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/spedytor/konsultacje-spedycji'>
                    <FaWarehouse color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Magazyny</span>
                </NavLink>
                {/* <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/magazyny'>
                    <FaWarehouse color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Magazyny</span>
                </NavLink> */}
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/spedytor/profil'>
                    <CgProfile color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Profil</span>
                </NavLink>
                <NavLink className='Orderer-Nav-Link' onClick={handleBackHome} to="/">
                    <BiHomeSmile color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Powrót</span>
                </NavLink>
                <NavLink className='Orderer-Nav-Link' onClick={handleLogout} to="/">
                    <AiOutlinePoweroff color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Wyloguj</span>
                </NavLink>
            </Nav>
        </Container>
    );
}
export default ForwarderNavigationSidebar;