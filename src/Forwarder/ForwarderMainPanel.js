import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ForwarderNavigationSidebar from './ForwarderNavigationSidebar';
import EditUserPanel from '../Admin/Users/EditUserPanel';
import Profile from '../Profile';
import NotFound from '../NotFound';
import WarehousesRoutes from '../Admin/Warehouses/WarehousesRoutes';
import TransportersRoutes from '../Admin/Transporters/TransportersRoutes';
import ForwarderForwardingOrdersDashboard from './ForwardingOrders/ForwarderForwardingOrdersDashboard';
import ConsultationsDashboard from './Consultations/ConsultationsDashboard';
import EditOrderPanel from '../Orderer/Orders/EditOrderPanel';
import EditForwardingOrderPanel from './ForwardingOrders/EditForwardingOrderPanel';
import './ForwarderMainPanel.css';

function ForwarderMainPanel() {
    return (
        <BrowserRouter>
            <Container className="Panel-Container" fluid>
                <Row>
                    <Col xs='2' style={{ position: 'fixed', height: '100%' }}>
                        <ForwarderNavigationSidebar />
                    </Col>
                    <Col xs='10' style={{ marginLeft: 250 }}>
                        <Switch>
                            <Route path='/spedytor/zlecenia/:id' component={EditForwardingOrderPanel}></Route>
                            <Route path='/spedytor/zlecenia' exact component={ForwarderForwardingOrdersDashboard}></Route>
                            <Route path='/spedytor/konsultacje-spedycji/:id' component={EditOrderPanel}></Route>
                            <Route path='/spedytor/konsultacje-spedycji' component={ConsultationsDashboard}></Route>
                            <Route path='/spedytor/magazyny' component={WarehousesRoutes}></Route>
                            <Route path='/spedytor/przewoznicy' component={TransportersRoutes}></Route>
                            <Route path='/spedytor/profil/edycja/:id' component={EditUserPanel}></Route>
                            <Route path='/spedytor/profil' component={Profile}></Route>
                            <Route component={NotFound}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}
export default ForwarderMainPanel;