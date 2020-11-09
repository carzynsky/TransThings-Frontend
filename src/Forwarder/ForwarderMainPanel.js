import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ForwarderNavigationSidebar from './ForwarderNavigationSidebar';
import EditUserPanel from '../Admin/Users/EditUserPanel';
import Profile from '../Profile';
import LoadingPage from '../LoadingPage';
import NotFound from '../NotFound';
import './ForwarderMainPanel.css';
import ConsultationsDashboard from './Consultations/ConsultationsDashboard';
import EditOrderPanel from '../Orderer/Orders/EditOrderPanel';

function ForwarderMainPanel() {
    return (
        <BrowserRouter>
            <Container className="Panel-Container" fluid>
                <Row>
                    <Col xs='2' style={{ position: 'fixed' }}>
                        <ForwarderNavigationSidebar />
                    </Col>
                    <Col xs='10' style={{ marginLeft: 250 }}>
                        <Switch>
                            <Route path='/spedytor/zlecenia' exact component={LoadingPage}></Route>
                            <Route path='/spedytor/konsultacje-spedycji/:id' component={EditOrderPanel}></Route>
                            <Route path='/spedytor/konsultacje-spedycji' component={ConsultationsDashboard}></Route>
                            <Route path='/spedytor/profil/edycja/:id' component={EditUserPanel}></Route>
                            <Route path='/spedytor/profil' component={Profile}></Route>
                            <Route component={NotFound}/>
                            {/* <Route path='/admin/przewoznicy' component={TransportersRoutes}></Route> */}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}
export default ForwarderMainPanel;