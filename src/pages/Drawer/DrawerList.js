import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles({
  list: {
    minWidth: 250,
    width: '100%',
  },
});


export default function DrawerList(props) {
  const classes = styles();
  const history = useHistory();

  return (
    <div
      className={clsx(classes.list)}
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List >
        <ListItem>
          <ListItemText primary={<Typography align='center' variant='h5'>CryptMail</Typography>} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={<Typography noWrap align='center' variant='body2'>john.doe@gmail.com</Typography>} />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Email</ListSubheader>}>
        <ListItem button onClick={() => { history.push('/app/list/inbox') }}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem button onClick={() => { history.push('/app/list/sent') }}>
          <ListItemIcon><SendIcon /></ListItemIcon>
          <ListItemText primary='Sent' />
        </ListItem>
        {/* <ListItem button >
          <ListItemIcon><DraftsIcon /></ListItemIcon>
          <ListItemText primary='Drafts' />
        </ListItem> */}
      </List>
      <Divider />
      <List subheader={<ListSubheader>PGP</ListSubheader>}>
        <ListItem button onClick={() => { history.push('/app/keys') }}>
          <ListItemIcon><VpnKeyIcon /></ListItemIcon>
          <ListItemText primary='Keys Settings' />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Account</ListSubheader>}>
        <ListItem button onClick={props.logout}>
          <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );
}
