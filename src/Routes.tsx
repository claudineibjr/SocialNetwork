import React from 'react';

import { Provider } from 'react-redux';
import store from './Store';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

export enum PossibleRoutes{
    LOGIN = '/login',
    HOME = '/home',
    PROFILE = '/profile'
}

export default function Routes(){
    return(
        <Provider store={store} >
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path={PossibleRoutes.LOGIN} component={Login}/>
                    <Route path={PossibleRoutes.HOME} component={Home}/>
                    <Route path={PossibleRoutes.PROFILE} component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}