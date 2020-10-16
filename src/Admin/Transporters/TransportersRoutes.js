import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TransportersDashboard from './TransportersDashboard';

class TransportersRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/przewoznicy' exact component={TransportersDashboard}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default TransportersRoutes;