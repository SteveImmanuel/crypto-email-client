import React from 'react';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/Main';
import { AuthRoute, ProtectedRoute } from './utils/CustomRoute';
import {CssBaseline} from '@material-ui/core';


function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/app' />
          </Route>
          <ProtectedRoute path='/app' component={Main} />
          <AuthRoute path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
