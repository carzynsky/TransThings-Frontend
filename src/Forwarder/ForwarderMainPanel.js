import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ForwarderNavigationSidebar from './ForwarderNavigationSidebar';
import NotFound from '../NotFound';
import './ForwarderMainPanel.css';

function ForwarderMainPanel() {
    return (
        <BrowserRouter>
                <Container className="Forwarder-Panel-Container">
            <Row>
                <Col xs='3'>
                    <ForwarderNavigationSidebar />
                </Col>
                <Col xs='9'>
                    <Switch>
                        <Route path='/spedytor/zlecenia' exact component={NotFound}></Route>
                        <Route path='/spedytor/doradztwa' component={NotFound}></Route>
                        <Route path='/spedytor/przewoznicy' component={NotFound}></Route>
                        <Route path='/spedytor/profil' component={NotFound}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default ForwarderMainPanel;