import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WarehousesDashboard from './WarehousesDashboard';

class WarehousesRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/magazyny' exact component={WarehousesDashboard}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default WarehousesRoutes;