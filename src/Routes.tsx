import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

export enum enumROUTES{
    LOGIN = '/login',
    HOME = '/home',
    PROFILE = '/profile'
}

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path='/' exact component={Login}/>
            <Route path='/login' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/profile' component={Profile}/>
        </BrowserRouter>
    )
}