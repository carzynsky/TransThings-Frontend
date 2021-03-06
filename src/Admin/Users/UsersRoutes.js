import React, { Component } from 'react';
import UsersPanel from './UsersPanel';
import AddUserPanel from './AddUserPanel';
import EditUserPanel from './EditUserPanel';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginHistoryPanel from './LoginHistoryPanel';

class UsersRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/uzytkownicy' exact component={UsersPanel}></Route>
                    <Route path='/admin/uzytkownicy/dodaj' component={AddUserPanel}></Route>
                    <Route path='/admin/uzytkownicy/edytuj/:id' component={EditUserPanel}></Route>
                    <Route path='/admin/uzytkownicy/historia-logowan/:id' component={LoginHistoryPanel}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default UsersRoutes;