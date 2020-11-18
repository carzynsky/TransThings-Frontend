import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminNavigationSideBar from './AdminNavigationSideBar';
import LoadingPage from '../LoadingPage';
import UsersRoutes from './Users/UsersRoutes';
import CustomerRoutes from './Customers/CustomersRoutes';
import TransportersRoutes from './Transporters/TransportersRoutes';
import WarehousesRoutes from './Warehouses/WarehousesRoutes';
import Profile from '../Profile';
import EditUserPanel from './Users/EditUserPanel';
import './AdminMainPanel.css';

function AdminMainPanel() {
    return (
        <BrowserRouter>
            <Container className="Panel-Container" fluid>
                <Row>
                    <Col xs='2' style={{ position: 'fixed', height: '100%' }}>
                        <AdminNavigationSideBar />
                    </Col>
                    <Col xs='10' style={{ marginLeft: 250 }}>
                        <Switch>
                            <Route path='/admin/uzytkownicy' exact component={UsersRoutes}></Route>
                            <Route path='/admin/kontrahenci' component={CustomerRoutes}></Route>
                            <Route path='/admin/magazyny' component={WarehousesRoutes}></Route>
                            <Route path='/admin/statystyki' component={LoadingPage}></Route>
                            <Route path='/admin/profil/edycja/:id' component={EditUserPanel}></Route>
                            <Route path='/admin/profil' component={Profile}></Route>
                            <Route path='/admin/przewoznicy' component={TransportersRoutes}></Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}
export default AdminMainPanel;