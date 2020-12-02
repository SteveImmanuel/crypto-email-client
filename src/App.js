import React from 'react';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LinearProgress } from '@material-ui/core';
import { AuthRoute, ProtectedRoute } from './utils/CustomRoute';
import { CssBaseline } from '@material-ui/core';
import config from './config';
import Auth from './utils/Auth';
import Main from './pages/Main';

class App extends React.Component {
  state = {
    isLoading: true
  }

  getUserData = async () => {
    try {

      const response = await fetch(`${config.API_URL}/api/auth/user`,
        {
          method: 'GET',
          // headers: {
          //   "X-Requested-With": "XMLHttpRequest"
          // },
          credentials: 'include'
        }
      )

      if (response.status === 200) {
        const data = await response.json();
        Auth.setAuthenticated(true);
        Auth.setData(data);
        this.setState({ isLoading: false });
      } else {
        Auth.setAuthenticated(false);
        this.setState({ isLoading: false });
      }
    } catch {
      Auth.setAuthenticated(false);
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {

    return (
      <>
        {
          this.state.isLoading ? <LinearProgress /> :
            <SnackbarProvider autoHideDuration={1500}>
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
            </SnackbarProvider>
        }
      </>
    )

  }
}

export default App;
