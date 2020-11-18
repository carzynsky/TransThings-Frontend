import React, { useRef } from 'react';
import { Router, Route, Switch } from 'react-router';
import * as Cookies from 'js-cookie';
import IdleTimer from 'react-idle-timer';
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


  const logOutOnIdle = () => {
    if(Cookies.get('session') === undefined) return
    
    Cookies.remove('session');
    history.push('/')
    alert("Minął czas sesji.")
  }

  return (
        <Router history={history}>
          <div>
          <IdleTimer
            timeout={1000 * 60 * 15}
            onIdle={logOutOnIdle}
          />
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/informacje' component={About}></Route>
              <Route path='/kontakt' component={Contact}></Route>

              <Route path='/admin/uzytkownicy' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
              <Route path='/admin/kontrahenci' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
              <Route path='/admin/przewoznicy' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
              <Route path='/admin/magazyny' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
              <Route path='/admin/profil' component={getSessionCookie().role === admin ? AdminMainPanel : NotFound }></Route>
              
              <Route path='/pracownik-zamowien/zamowienia' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
              <Route path='/pracownik-zamowien/zlecenia-spedycji' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
              <Route path='/pracownik-zamowien/spedytorzy' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
              <Route path='/pracownik-zamowien/magazyny' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
              <Route path='/pracownik-zamowien/kontrahenci' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>
              <Route path='/pracownik-zamowien/profil' component={getSessionCookie().role === orderer ? OrdererMainPanel : NotFound }></Route>

              <Route path='/spedytor/zlecenia' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
              <Route path='/spedytor/przewoznicy' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
              <Route path='/spedytor/konsultacje-spedycji' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
              <Route path='/spedytor/magazyny' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
              <Route path='/spedytor/profil' component={getSessionCookie().role === forwarder ? ForwarderMainPanel : NotFound }></Route>
              <Route component={NotFound}/>
            </Switch>
          </div>
      </Router>
  );
}
export default Routes;