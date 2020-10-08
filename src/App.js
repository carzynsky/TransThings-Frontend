import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import About from './Home/About';
import Contact from './Home/Contact';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/contact' component={Contact}></Route>
        </Switch>
      </BrowserRouter>
  );
}
export default App;