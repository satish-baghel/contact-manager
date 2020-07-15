import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helper/auth';
import { Provider } from 'react-redux';
import store from './store';
//PAGES
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/dashBoard';
import AddClient from './components/clients/AddClient';
import ClientDetail from './components/clients/clientDetail';
import ClientEdit from './components/clients/editClient';
import Login from './components/auth/login';
import Settings from './components/settings/settings';

//  BOOTSTRAP CSS AND JAVASCRIPT

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path='/settings'
                component={UserIsAuthenticated(Settings)}
              />
              <Route
                exact
                path='/client/add'
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path='/client/:id'
                component={UserIsAuthenticated(ClientDetail)}
              />
              <Route
                exact
                path='/client/edit/:id'
                component={UserIsAuthenticated(ClientEdit)}
              />
              <Route
                exact
                path='/login'
                component={UserIsNotAuthenticated(Login)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
