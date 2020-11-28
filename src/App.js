import React from 'react';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './utils/custom-route';


function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path='/' component={Main} />
        <AuthRoute path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
