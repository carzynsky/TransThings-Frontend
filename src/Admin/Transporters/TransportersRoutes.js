import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../../NotFound';
import AddDriverPanel from './AddDriverPanel';
import AddTransporterPanel from './AddTransporterPanel';
import AddVehiclePanel from './AddVehiclePanel';
import DriversPanel from './DriversPanel';
import EditDriverPanel from './EditDriverPanel';
import EditTransporterPanel from './EditTransporterPanel';
import EditVehiclePanel from './EditVehiclePanel';
import TransportersDashboard from './TransportersDashboard';
import VehiclesPanel from './VehiclesPanel';

class TransportersRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/przewoznicy' exact component={TransportersDashboard}></Route>
                    <Route path='/spedytor/przewoznicy' exact component={TransportersDashboard}></Route>
                    <Route path='/admin/przewoznicy/:name/edytuj' component={EditTransporterPanel}></Route>
                    <Route path='/admin/przewoznicy/dodaj' component={AddTransporterPanel}></Route>
                    <Route path='/admin/przewoznicy/:name/kierowcy/edytuj/:id' component={EditDriverPanel}></Route>
                    <Route path='/admin/przewoznicy/:name/kierowcy/dodaj' component={AddDriverPanel}></Route>
                    <Route path='/admin/przewoznicy/:name/pojazdy/edytuj/:id' component={EditVehiclePanel}></Route>
                    <Route path='/admin/przewoznicy/:name/pojazdy/dodaj' component={AddVehiclePanel}></Route>
                    <Route path='/admin/przewoznicy/:name/kierowcy' component={DriversPanel}></Route>
                    <Route path='/admin/przewoznicy/:name/pojazdy' component={VehiclesPanel}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default TransportersRoutes;