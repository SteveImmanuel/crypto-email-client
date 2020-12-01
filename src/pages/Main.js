import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import EmailList from './EmailList/EmailList';
import Read from './Read/Read';
import Keys from './Keys/Keys';
import Compose from './Compose/Compose';
import DrawerList from './Drawer/DrawerList';
import { NotFound } from './NotFound';
import Auth from '../utils/Auth';

class Main extends React.Component {
  state = {
    isDrawerOpen: false,
    isRefreshing: true,
    currentPage: 0,
  };

  toggleDrawer = (open) => (event) => {
    this.setState({ isDrawerOpen: open });
  };

  logout = () => {
    Auth.logout(() => {
      this.props.history.push('/login');
    });
  };

  render() {
    return (
      <React.Fragment>
        <Drawer anchor="left" open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <DrawerList toggleDrawer={this.toggleDrawer} logout={this.logout} />
        </Drawer>

        <Switch>
          <Route exact path={`${this.props.match.path}`}>
            <Redirect to={`${this.props.match.path}/list/inbox`} />
          </Route>
          <Route
            path={`${this.props.match.path}/list/inbox`}
            render={(props) => <EmailList {...props} type='inbox' toggleDrawer={this.toggleDrawer} />}
          />
          <Route
            path={`${this.props.match.path}/list/sent`}
            render={(props) => <EmailList {...props} type='sent' toggleDrawer={this.toggleDrawer} />}
          />
          <Route path={`${this.props.match.path}/compose`} render={(props) => <Compose {...props} />} />
          <Route path={`${this.props.match.path}/read/:id`} render={(props) => <Read {...props} />} />
          <Route
            path={`${this.props.match.path}/keys`}
            render={(props) => <Keys {...props} toggleDrawer={this.toggleDrawer} />}
          />
          <Route path={`${this.props.match.path}*`} component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
