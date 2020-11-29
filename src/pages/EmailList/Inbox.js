import React from 'react';
import clsx from 'clsx';
import { List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, Fab } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { formatToTimeZone } from 'date-fns-timezone';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = makeStyles({
  rightAligned: {
    textAlign: 'right',
    verticalAlign: 'top'
  },
  unread: {
    color: fade('rgba(0, 0, 0)', 0.54)
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  extendedIcon: {
    marginRight: 10
  }
});

export default function Inbox(props) {
  const classes = styles();

  const styledTitle = (title) => {
    return (
      <Typography>
        <b>{title}</b>
      </Typography>
    );
  }

  const styledDesc = (sender, content) => {
    return (
      <Typography
        variant='body2'
        noWrap>
        <b>{sender}</b> - {content}
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            onClick={props.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.grow} variant='h6'>Inbox</Typography>

          <IconButton color='inherit'>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        {props.emails.map((email, index) => (
          <ListItem button divider className={clsx({ [classes.unread]: email.isRead })} key={index}>
            <ListItemText
              disableTypograhpy
              primary={styledTitle(email.subject)}
              secondary={styledDesc(email.sender, email.content)}
            />
            <ListItemText
              class={classes.rightAligned}
              secondary={formatToTimeZone(email.datetime, 'D MMM', { timeZone: 'Asia/Jakarta' })}
            />
          </ListItem>

        ))}
      </List>
      <Fab variant='extended' color='secondary' className={classes.fab}>
        <MailIcon className={classes.extendedIcon} />
          Compose
      </Fab>
    </React.Fragment>
  );
}
