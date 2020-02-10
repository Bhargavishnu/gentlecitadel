import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './App.css';
import Home from './components/Home';
import DashBoard from './components/Dashboard';
import Settings from './components/Settings';
import Teams from './components/Teams';
import Error from './components/Error';


function App(){    
const customHistory = createBrowserHistory(); 
    const baseURL="https://taskline.com"
        return(
            <main>
            <Switch>
                <Route path="/" history={customHistory}  component={Home} exact />
                <Route path="/dashboard" history={customHistory}  component={DashBoard} />
                <Route path="/settings" history={customHistory} url={baseURL}  component={Settings} />
                <Route path="/teams" history={customHistory} url={baseURL} component={Teams} />
                <Route  component={Error} />
            
            </Switch>
        </main>
        );
        
    
}
export default App;
