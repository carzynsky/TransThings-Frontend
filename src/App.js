import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import About from './Home/About';
import Contact from './Home/Contact';
import AdminMainPanel from './Admin/AdminMainPanel';
import ForwarderMainPanel from './Forwarder/ForwarderMainPanel';
import OrdererMainPanel from './Orderer/OrdererMainPanel';
import NotFound from './NotFound';
import Home from './Home/Home';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/contact' component={Contact}></Route>
            <Route path='/admin/konfiguracja' component={AdminMainPanel}></Route>
            <Route path='/spedytor/zlecenia' component={ForwarderMainPanel}></Route>
            <Route path='/pracownik-zamowien/zamowienia' component={OrdererMainPanel}></Route>
            <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
  );
}
export default App;