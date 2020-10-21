import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CustomersDashboard from './CustomersDashboard';
import EditCustomerPanel from './EditCustomerPanel';
import AddCustomerPanel from './AddCustomerPanel';

class CustomerRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/kontrahenci' exact component={CustomersDashboard}></Route>
                    <Route path='/admin/kontrahenci/edytuj' component={EditCustomerPanel}></Route>
                    <Route path='/admin/kontrahenci/dodaj' component={AddCustomerPanel}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default CustomerRoutes;