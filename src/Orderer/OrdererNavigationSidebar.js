import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import history from '../history.js';
import * as Cookies from 'js-cookie';
import { getSessionCookie } from '../sessions';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaUserTie, FaWarehouse } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { BiTask, BiHomeSmile } from 'react-icons/bi';
import { CgProfile, CgFileDocument } from 'react-icons/cg';
import './OrdererNavigationSidebar.css';

const OrdererNavigationSideBar = () => {
    
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
                            <label className='Admin-Header' >Pracownik zamówień</label>
                        </Col>
                    </Row>
                    <Row style={{textAlign: 'center', paddingTop: '0px'}}>
                        <Col>
                            <label>{getSessionCookie().login}</label>
                        </Col>
                    </Row>
                </div>
                {/* activeStyle={{ backgroundColor: '#5CDB95', color: '#1a1a1d', boxShadow: '2px 2px 15px -4px rgba(92,219,149,1)', borderRadius: '2px'}} */}
                <NavLink exact activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/zamowienia'>
                    <CgFileDocument color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>Zamówienia</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/zlecenia-spedycji'>
                    <BiTask color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Zlecenia spedycji</span>
                </NavLink>
                <NavLink activeStyle={{ color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/spedytorzy'>
                    <RiUserVoiceFill color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>Spedytorzy</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/kontrahenci'>
                    <FaUserTie color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Kontrahenci</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/magazyny'>
                    <FaWarehouse color='#5cdb95' size='1.8em'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span >Magazyny</span>
                </NavLink>
                <NavLink activeStyle={{color: 'white'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/profil'>
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
export default OrdererNavigationSideBar;