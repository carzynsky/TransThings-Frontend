import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CustomersDashboard from './CustomersDashboard';

class CustomerRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/kontrahenci' exact component={CustomersDashboard}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default CustomerRoutes;