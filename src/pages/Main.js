import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }
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

    let toolbar;

    return (
      <Router>

        <CssBaseline />

        <Drawer anchor='left' open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <DrawerList toggleDrawer={this.toggleDrawer} />
        </Drawer>


        <Inbox emails={dummyData} toggleDrawer={this.toggleDrawer}/>
        {/* <Read /> */}
        {/* <Compose /> */}

        
      </Router>

    );
  }
}

export default withStyles(styles)(Main);
