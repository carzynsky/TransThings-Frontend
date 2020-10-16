import React from 'react';
import {Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './OrdererNavigationSidebar.css';
import history from '../history';
import * as Cookies from 'js-cookie';
import { getSessionCookie } from '../sessions';

function OrdererNavigationSidebar() {

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
        <Container className="Orderer-Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '80px'}}>
                    <h1>Pracownik zamówień</h1>
                </div>
                <div style={{textAlign: 'center', paddingTop: '10px'}}>
                    <label>{getSessionCookie().login}</label>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/zamowienia'>ZAMÓWIENIA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/spedytorzy'>SPEDYTORZY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/kontrahenci'>KONTRAHENCI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/magazyny'>MAGAZYNY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/profil'>PROFIL</NavLink>
                <Nav.Link href='/' className='Orderer-Nav-Link' onClick={handleBackHome}>POWRÓT</Nav.Link>
                <Nav.Link href='/' className='Orderer-Nav-Link' onClick={handleLogout}>WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default OrdererNavigationSidebar;