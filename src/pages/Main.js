import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Drawer, CssBaseline, AppBar, Toolbar, InputBase, IconButton, Snackbar, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import MailIcon from '@material-ui/icons/Mail';
import auth from '../utils/auth';
import DrawerList from './Drawer/DrawerList';
import Inbox from './EmailList/Inbox';

const styles = theme => {
  return {
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
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
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
  }
}


class Main extends React.Component {
  state = {
    isDrawerOpen: false,
    isRefreshing: true,
  };


  toggleDrawer = (open) => (event) => {
    this.setState({ isDrawerOpen: open });
  };

  refresh = () => {
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position='sticky'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search email...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>

            <IconButton color='inherit' onClick={this.refresh}>
              <RefreshIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer anchor='left' open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <DrawerList toggleDrawer={this.toggleDrawer} />
        </Drawer>

        <Inbox />

        <Fab variant='extended' color='secondary' className={classes.fab}>
          <MailIcon className={classes.extendedIcon} />
          Compose
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
