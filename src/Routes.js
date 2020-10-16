import React from 'react';
import { Router, Route, Switch } from 'react-router';
import About from './Home/About';
import Contact from './Home/Contact';
import AdminMainPanel from './Admin/AdminMainPanel';
import ForwarderMainPanel from './Forwarder/ForwarderMainPanel';
import OrdererMainPanel from './Orderer/OrdererMainPanel';
import NotFound from './NotFound';
import Home from './Home/Home';
import history from './history';
import { getSessionCookie } from './sessions';

export const Routes = () => {

  const admin = 'Admin';
  const forwarder = 'Forwarder';
  const orderer = 'Orderer';

  return (
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/informacje' component={About}></Route>
            <Route path='/kontakt' component={Contact}></Route>

            <Route path='/admin/konfiguracja' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
            <Route path='/spedytor/zlecenia' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
            <Route path='/pracownik-zamowien/zamowienia' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
            <Route component={NotFound}/>
          </Switch>
      </Router>
  );
}
export default Routes;