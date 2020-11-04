import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import OrdererNavigationSidebar from './OrdererNavigationSidebar';
import LoadingPage from '../LoadingPage';
import WarehousesRoutes from '../Admin/Warehouses/WarehousesRoutes';
import Profile from '../Profile';
import EditUserPanel from '../Admin/Users/EditUserPanel';
import CustomerRoutes from '../Admin/Customers/CustomersRoutes';
import './OrdererMainPanel.css';
import ForwardersPanel from './Forwarders/ForwardersPanel';
import OrdersDashboard from './Orders/OrdersDashboard';
import AddOrderPanel from './Orders/AddOrderPanel';
import OrdersRoutes from './Orders/OrdersRoutes';


function AdminMainPanel() {
    return (
        <BrowserRouter>
            <Container className="Panel-Container" fluid>
                <Row>
                    <Col xs='2' style={{position: 'fixed'}}>
                        <OrdererNavigationSidebar />
                    </Col>
                    <Col xs='10' style={{marginLeft: '250px'}}>
                        <Switch>
                            <Route path='/pracownik-zamowien/zamowienia' exact component={OrdersRoutes}></Route>
                            <Route path='/pracownik-zamowien/zlecenia-spedycji' component={LoadingPage}></Route>
                            <Route path='/pracownik-zamowien/spedytorzy' component={ForwardersPanel}></Route>
                            <Route path='/pracownik-zamowien/kontrahenci' component={CustomerRoutes}></Route>
                            <Route path='/pracownik-zamowien/magazyny' component={WarehousesRoutes}></Route>
                            <Route path='/pracownik-zamowien/profil/edycja/:id' component={EditUserPanel}></Route>
                            <Route path='/pracownik-zamowien/profil' component={Profile}></Route>
                            <Route component={LoadingPage}></Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}
export default AdminMainPanel;