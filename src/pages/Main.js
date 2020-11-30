import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Drawer, CssBaseline } from '@material-ui/core';
import DrawerList from './Drawer/DrawerList';
import Inbox from './EmailList/Inbox';
import Read from './Read/Read';
import Compose from './Compose/Compose';

const styles = theme => {
  return {
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }
}

const dummyContent = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
donec massa sapien faucibus et molestie ac.
`;

const dummyData = [
  {
    subject: "Email Subject",
    sender: "Sender",
    content: dummyContent,
    datetime: new Date(),
    isRead: false
  },
  {
    subject: "Email Subject 2",
    sender: "Sender 2",
    content: dummyContent,
    datetime: new Date(),
    isRead: false
  },
  {
    subject: "Email Subject 3",
    sender: "Sender 3",
    content: dummyContent,
    datetime: new Date(),
    isRead: true
  },
  {
    subject: "Email Subject 4",
    sender: "Sender 4",
    content: dummyContent,
    datetime: new Date(),
    isRead: true
  }
]



class Main extends React.Component {
  state = {
    isDrawerOpen: false,
    isRefreshing: true,
    currentPage: 0,
  };


  toggleDrawer = (open) => (event) => {
    this.setState({ isDrawerOpen: open });
  };

  refresh = () => {
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>

        <CssBaseline />

        <Drawer anchor='left' open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <DrawerList toggleDrawer={this.toggleDrawer} />
        </Drawer>
        <Switch>
          <Route exact path={`${this.props.match.path}`}>
            <Redirect to={`${this.props.match.path}/inbox`} />
          </Route>
          <Route path={`${this.props.match.path}/inbox`} render={(props) => <Inbox {...props} emails={dummyData} toggleDrawer={this.toggleDrawer} />} />
          <Route path={`${this.props.match.path}/compose`} render={(props) => <Compose {...props} />} />
          <Route path={`${this.props.match.path}/read`} render={(props) => <Read {...props} />} />
        </Switch>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);
