import React from 'react';
// import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
// import { Router } from 'react-router';
// import About from './Home/About';
// import Contact from './Home/Contact';
// import AdminMainPanel from './Admin/AdminMainPanel';
// import ForwarderMainPanel from './Forwarder/ForwarderMainPanel';
// import OrdererMainPanel from './Orderer/OrdererMainPanel';
// import NotFound from './NotFound';
// import Home from './Home/Home';
// import { sessionService } from 'redux-react-session';
// import history from './history.js';
import Routes from './Routes';

function App() {

  // const [finished, setFinished] = useState(false)
  // const [auth, setAuth] = useState(false)
  // const [role, setRole] = useState('none')
  
  // sessionService.loadSession()
  // .then(currentSession => {
  //   setAuth(true)
  //   // console.log(currentSession)
  // })
  // .catch(err => {console.log(err)})

  // sessionService.loadUser()
  // .then(currentUser => {
  //   setRole(currentUser)
  //   setFinished(true)
  //   // console.log(currentUser)
  // })
  // .catch(err => setFinished(true))

  return (
    <div>
      <Routes />
    </div>
  );
}
export default App;