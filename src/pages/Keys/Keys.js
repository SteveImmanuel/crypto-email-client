import React, { useState } from 'react';
import {
  List, ListItem, Button, ListItemText,
  ListSubheader, Divider, TextField, ListItemSecondaryAction,
  Typography, AppBar, Toolbar, IconButton, Fab
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles({
  grow: {
    flexGrow: 1
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
});


export default function DrawerList(props) {
  const [disableFab, setDisableFab] = useState(true);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [signingKey, setSigningKey] = useState({ private: '', publik: '' });

  const classes = styles();

  const back = () => {
    props.history.goBack();
  }

  const saveSettings = () => {
    //TODO upload settings to server
    console.log('NOT IMPLEMENTED, save settings')
  }

  const downloadSigningKey = () => {
    //TODO download from server
    console.log('NOT IMPLEMENTED, download signing key')
  }

  const uploadSigningKey = () => {
    //TODO choose file, then parse to text
    console.log('NOT IMPLEMENTED, upload signing key')
  }

  const generateSigningKey = () => {
    //TODO cal api to generate
    console.log('NOT IMPLEMENTED, call generate signing key')
  }

  const generateRandomString = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    setEncryptionKey(text);
    setDisableFab(false);
  }

  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' onClick={props.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Typography className={classes.grow} variant='h6'>Keys Settings</Typography>

        </Toolbar>
      </AppBar>

      <List subheader={<ListSubheader>Encryption</ListSubheader>}>
        <ListItem>
          <ListItemText primary='Set Up Encryption Key' />
          <ListItemSecondaryAction>
            <Button color='primary' variant="outlined" onClick={generateRandomString}>Generate</Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            margin='dense'
            variant='outlined'
            label='Encryption Key'
            value={encryptionKey}
            onChange={(event) => {
              setDisableFab(false);
              setEncryptionKey(event.target.value);
            }}
          />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Signing</ListSubheader>}>
        <ListItem>
          <ListItemText primary='Set Up Singing Key' />
          <ListItemSecondaryAction>
            <Button color='primary' variant="outlined" onClick={generateSigningKey}>Generate</Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            multiline
            rows='10'
            margin='dense'
            variant='outlined'
            label='Private Key'
            value={signingKey.private}
            onChange={(event) => {
              setDisableFab(false);
              setSigningKey({ ...signingKey, private: event.target.value });
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            multiline
            rows='10'
            margin='dense'
            variant='outlined'
            label='Public Key'
            value={signingKey.public}
            onChange={(event) => {
              setDisableFab(false);
              setSigningKey({ ...signingKey, public: event.target.value });
            }}
          />
        </ListItem>
        <ListItem>
          <Button color='primary' variant="outlined" onClick={uploadSigningKey} style={{ marginRight: 12 }}>Upload</Button>
          <Button color='primary' variant="outlined" onClick={downloadSigningKey}>Download</Button>
        </ListItem>
      </List>
      <Fab color='secondary' disabled={disableFab} className={classes.fab} onClick={saveSettings}>
        <SaveIcon />
      </Fab>
    </div>
  );
}
