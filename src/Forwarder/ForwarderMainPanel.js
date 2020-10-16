import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ForwarderNavigationSidebar from './ForwarderNavigationSidebar';
import LoadingPage from '../LoadingPage';
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
                        <Route path='/spedytor/zlecenia' exact component={LoadingPage}></Route>
                        <Route path='/spedytor/doradztwa' component={LoadingPage}></Route>
                        <Route path='/spedytor/przewoznicy' component={LoadingPage}></Route>
                        <Route path='/spedytor/profil' component={LoadingPage}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
        </BrowserRouter>
    );
}
export default ForwarderMainPanel;