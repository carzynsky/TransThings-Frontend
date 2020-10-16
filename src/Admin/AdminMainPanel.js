import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminNavigationSideBar from './AdminNavigationSideBar';
import './AdminMainPanel.css';
import LoadingPage from '../LoadingPage';
import ConfigurationPanel from './Configurations/ConfigurationPanel';
import UsersRoutes from './Users/UsersRoutes';
import CustomerRoutes from './Customers/CustomersRoutes';
import TransportersRoutes from './Transporters/TransportersRoutes';
import WarehousesRoutes from './Warehouses/WarehousesRoutes';

function AdminMainPanel() {
    return (
        <BrowserRouter>
        <Container className="Panel-Container" fluid>
            <Row>
                <Col xs='2'>
                    <AdminNavigationSideBar />
                </Col>
                <Col xs='10'>
                    <Switch>
                        <Route path='/admin/konfiguracja' exact component={ConfigurationPanel}></Route>
                        <Route path='/admin/uzytkownicy' component={UsersRoutes}></Route>
                        <Route path='/admin/kontrahenci' component={CustomerRoutes}></Route>
                        <Route path='/admin/magazyny' component={WarehousesRoutes}></Route>
                        <Route path='/admin/statystyki' component={LoadingPage}></Route>
                        <Route path='/admin/profil' component={LoadingPage}></Route>
                        <Route path='/admin/przewoznicy' component={TransportersRoutes}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default AdminMainPanel;