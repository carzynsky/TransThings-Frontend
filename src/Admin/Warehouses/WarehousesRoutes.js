import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddWarehousePanel from './AddWarehousePanel';
import WarehousesDashboard from './WarehousesDashboard';
import EditWarehousePanel from './EditWarehousePanel';

class WarehousesRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/magazyny' exact component={WarehousesDashboard}></Route>
                    <Route path='/pracownik-zamowien/magazyny' exact component={WarehousesDashboard}></Route>
                    <Route path='/admin/magazyny/dodaj' component={AddWarehousePanel}></Route>
                    <Route path='/admin/magazyny/edytuj' component={EditWarehousePanel}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default WarehousesRoutes;