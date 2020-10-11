import React from 'react';
import { Router, Route, Switch } from 'react-router';
// import {Switch, Route, Redirect} from 'react-router-dom';
import About from './Home/About';
import Contact from './Home/Contact';
import AdminMainPanel from './Admin/AdminMainPanel';
// import ForwarderMainPanel from './Forwarder/ForwarderMainPanel';
// import OrdererMainPanel from './Orderer/OrdererMainPanel';
import NotFound from './NotFound';
import Home from './Home/Home';
import history from './history';
import { getSessionCookie } from './sessions';

export const Routes = () => {
  return (
        <Router history={history}>
          <Switch>
            {/* {getSessionCookie().role === 'Admin' &&  <Route path='/' exact component={Home}><Redirect push to='/admin/konfiguracja'/></Route>} */}
            <Route path='/' exact component={Home}></Route>
            <Route path='/informacje' component={About}></Route>
            <Route path='/kontakt' component={Contact}></Route>

            <Route path='/admin/konfiguracja' component={getSessionCookie().role === 'Admin' ? AdminMainPanel : NotFound }></Route>
            <Route component={NotFound}/>
          </Switch>
      </Router>

        // <Switch>
        //   {auth === true && role === 'Orderer' && <Route path='/' exact component={OrdererMainPanel}><Redirect to="/pracownik-zamowien/zamowienia" /></Route>}
        //   {auth === true && role === 'Forwarder' && <Route path='/' exact component={ForwarderMainPanel}><Redirect to="/spedytor/zlecenia" /></Route>}
        //     <Route path='/' exact component={Home}></Route>
        //     <Route path='/about' component={About}></Route>
        //     <Route path='/contact' component={Contact}></Route>
        //   {auth === true && role === 'Admin' && <Route path='/admin/konfiguracja' component={AdminMainPanel}></Route>}
        //   {auth === true && role === 'Forwarder' && <Route path='/spedytor/zlecenia' component={ForwarderMainPanel}></Route>}
        //   {auth === true && role === 'Orderer' && <Route path='/pracownik-zamowien/zamowienia' component={OrdererMainPanel}></Route>}
        // </Switch> */}
  );
}
export default Routes;