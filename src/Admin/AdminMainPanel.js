import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AdminNavigationSideBar from './AdminNavigationSideBar';
import NotFound from '../NotFound';
import './AdminMainPanel.css';

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
                        <Route path='/admin/konfiguracja' exact component={NotFound}></Route>
                        <Route path='/admin/uzytkownicy' component={NotFound}></Route>
                        <Route path='/admin/kontrahenci' component={NotFound}></Route>
                        <Route path='/admin/magazyny' component={NotFound}></Route>
                        <Route path='/admin/statystyki' component={NotFound}></Route>
                        <Route path='/admin/profil' component={NotFound}></Route>
                        <Route path='/admin/przewoznicy' component={NotFound}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default AdminMainPanel;