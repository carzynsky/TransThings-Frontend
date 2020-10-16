import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import OrdererNavigationSidebar from './OrdererNavigationSidebar';
import LoadingPage from '../LoadingPage';
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
                        <Route path='/pracownik-zamowien/zamowienia' exact component={LoadingPage}></Route>
                        <Route path='/pracownik-zamowien/kontrahenci' component={LoadingPage}></Route>
                        <Route path='/pracownik-zamowien/spedytorzy' component={LoadingPage}></Route>
                        <Route path='/pracownik-zamowien/magazyny' component={LoadingPage}></Route>
                        <Route path='/pracownik-zamowien/profil' component={LoadingPage}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default OrdererMainPanel;