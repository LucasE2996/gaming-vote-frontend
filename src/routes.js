import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/main/:id" component={Main}/>
            <Route path="/admin" component={Dashboard} />
        </BrowserRouter>
    );
}

export default Routes;