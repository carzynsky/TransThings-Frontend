import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ForwarderNavigationSidebar from './ForwarderNavigationSidebar';
import EditUserPanel from '../Admin/Users/EditUserPanel';
import Profile from '../Profile';
import LoadingPage from '../LoadingPage';
import NotFound from '../NotFound';
import './ForwarderMainPanel.css';

function ForwarderMainPanel() {
    return (
        <BrowserRouter>
            <Container className="Panel-Container" fluid>
                <Row>
                    <Col xs='2'>
                        <ForwarderNavigationSidebar />
                    </Col>
                    <Col xs='10'>
                        <Switch>
                            <Route path='/spedytor/zlecenia' exact component={LoadingPage}></Route>
                            <Route path='/spedytor/konsultacje-spedycji' component={LoadingPage}></Route>
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