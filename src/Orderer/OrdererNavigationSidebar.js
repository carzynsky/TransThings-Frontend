import React from 'react';
import {Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './OrdererNavigationSidebar.css';

function OrdererNavigationSidebar() {
    return (
        <Container className="Orderer-Navigation-Container">
            <Nav className="flex-column">
                <div style={{textAlign: 'center', paddingTop: '100px'}}>
                    <h1>Pracownik zamówień</h1>
                </div>
                <NavLink exact activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/zamowienia'>ZAMÓWIENIA</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/spedytorzy'>SPEDYTORZY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/kontrahenci'>KONTRAHENCI</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/magazyny'>MAGAZYNY</NavLink>
                <NavLink activeStyle={{ backgroundColor: '#5CDB95', color: '#05386B'}} className="Orderer-Nav-Link" to= '/pracownik-zamowien/profil'>PROFIL</NavLink>
                <Nav.Link  className='Orderer-Nav-Link' href="http://localhost:3000/">WYLOGUJ</Nav.Link>
            </Nav>
        </Container>
    );
}
export default OrdererNavigationSidebar;