import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddOrderPanel from './AddOrderPanel';
import OrdersDashboard from './OrdersDashboard';

class OrdersRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/pracownik-zamowien/zamowienia' exact component={OrdersDashboard}></Route>
                    <Route path='/pracownik-zamowien/zamowienia/dodaj' component={AddOrderPanel}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default OrdersRoutes;