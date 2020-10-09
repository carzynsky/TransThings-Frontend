import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import OrdererNavigationSidebar from './OrdererNavigationSidebar';
import NotFound from '../NotFound';
import './OrdererMainPanel.css';

function OrdererMainPanel() {
    return (
        <BrowserRouter>
                <Container className="Orderer-Panel-Container">
            <Row>
                <Col xs='3'>
                    <OrdererNavigationSidebar />
                </Col>
                <Col xs='9'>
                    <Switch>
                        <Route path='/pracownik-zamowien/zamowienia' exact component={NotFound}></Route>
                        <Route path='/pracownik-zamowien/kontrahenci' component={NotFound}></Route>
                        <Route path='/pracownik-zamowien/spedytorzy' component={NotFound}></Route>
                        <Route path='/pracownik-zamowien/magazyny' component={NotFound}></Route>
                        <Route path='/pracownik-zamowien/profil' component={NotFound}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default OrdererMainPanel;