import React, { Component } from 'react';
import UsersPanel from './UsersPanel';
import AddUserPanel from './AddUserPanel';
import EditUserPanel from './EditUserPanel';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class UsersRoutes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/admin/uzytkownicy' exact component={UsersPanel}></Route>
                    <Route path='/admin/uzytkownicy/dodaj' component={AddUserPanel}></Route>
                    <Route path='/admin/uzytkownicy/edytuj/:id' component={EditUserPanel}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default UsersRoutes;