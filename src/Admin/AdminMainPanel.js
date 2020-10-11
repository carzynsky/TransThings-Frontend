import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AdminNavigationSideBar from './AdminNavigationSideBar';
import './AdminMainPanel.css';
import LoadingPage from '../LoadingPage';

function AdminMainPanel() {
    return (
        <BrowserRouter>
                <Container className="Panel-Container">
            <Row>
                <Col xs='3'>
                    <AdminNavigationSideBar />
                </Col>
                <Col xs='9'>
                    <Switch>
                        <Route path='/admin/konfiguracja' exact component={LoadingPage}></Route>
                        <Route path='/admin/uzytkownicy' component={LoadingPage}></Route>
                        <Route path='/admin/kontrahenci' component={LoadingPage}></Route>
                        <Route path='/admin/magazyny' component={LoadingPage}></Route>
                        <Route path='/admin/statystyki' component={LoadingPage}></Route>
                        <Route path='/admin/profil' component={LoadingPage}></Route>
                        <Route path='/admin/przewoznicy' component={LoadingPage}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default AdminMainPanel;