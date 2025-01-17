import React, { useState, useEffect } from 'react';
import {
  List, ListItem, Button, ListItemText,
  TextField, ListItemSecondaryAction,
  Typography, AppBar, Toolbar, IconButton, Fab, CircularProgress
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import config from '../../config';

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


export default function Keys(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [disableFab, setDisableFab] = useState(true);
  const [signingKey, setSigningKey] = useState({ private: '', public: '', initial: true });
  const [loading, setLoading] = useState({
    generateSignKey: true,
    saveSetting: false,
    downloadSignKey: false,
  })

  const classes = styles();

  const saveSettings = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, saveSetting: true })

    const response = await fetch(`${config.API_URL}/api/key/save`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          privateKey: signingKey.private,
          publicKey: signingKey.public
        })
      }
    )

    if (response.status !== 200) {
      enqueueSnackbar('Fail to save keys', { variant: 'error' });
    } else {
      enqueueSnackbar('Key saved', { variant: 'success' });
    }
    setDisableFab(true);
    setLoading({ ...loading, saveSetting: false });

  }

  const exportKey = () => {
    const element = document.createElement('a');
    const file = new Blob([`${signingKey.private}:${signingKey.public}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'signature.key';
    document.body.appendChild(element);
    element.click();
  }

  const importKey = (event) => {
    let file = event.target.files[0];
    if (!file) {
      return
    }

    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (evt) => {
      let key = evt.target.result.split(':');
      if (key.length !== 2) {
        enqueueSnackbar('Error reading key', { variant: 'error' });
        return
      }
      setSigningKey({ private: key[0], public: key[1] });
      setDisableFab(false);
    }
    reader.onerror = () => {
      enqueueSnackbar('Error reading key', { variant: 'error' });
    }
  }

  const generateSigningKey = async () => {

    const response = await fetch(`${config.API_URL}/api/key/generate`, {
      method: 'GET',
      credentials: 'include',
    })
    if (response.status !== 200) {
      enqueueSnackbar('Error generate key', { variant: 'error' });
    }

    const data = await response.json();
    setSigningKey({ private: data.data.privateKey, public: data.data.publicKey })
    setLoading({ ...loading, generateSignKey: false })
    enqueueSnackbar('Key generated', { variant: 'success' });
    setDisableFab(false);
  }

  const fetchKey = async () => {
    const response = await fetch(`${config.API_URL}/api/key`, {
      method: 'GET',
      credentials: 'include',
    })

    if (response.status !== 200) {
      enqueueSnackbar('Error get key', { variant: 'error' });
      setSigningKey({ ...signingKey, initial: false });
    } else {
      console.log('200');
      const data = await response.json();
      setSigningKey({ private: data.data.privateKey, public: data.data.publicKey, initial: false });
    }

    setLoading({ ...loading, generateSignKey: false });

  }

  useEffect(() => {
    if (signingKey.initial) {
      fetchKey();
    }
  })

  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' onClick={props.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Typography className={classes.grow} variant='h6'>Keys</Typography>

        </Toolbar>
      </AppBar>

      <form onSubmit={saveSettings}>
        <List>

          <ListItem>
            <ListItemText primary='Set Up Signing Key' />
            <ListItemSecondaryAction>
              <Button color='primary' variant='outlined' disabled={loading.generateSignKey} onClick={() => {
                setLoading({ ...loading, generateSignKey: true });
                generateSigningKey()
              }}>{loading.generateSignKey ? <CircularProgress size={24} /> : 'Generate'}</Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              multiline
              required
              disabled={loading.generateSignKey}
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
              required
              disabled={loading.generateSignKey}
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
            <Button color='primary' variant='outlined'
              component='label'
              style={{ marginRight: 12 }}>
              <input accept='.key' type='file' hidden value='' onChange={importKey} />
            Import
            </Button>
            <Button color='primary' variant='outlined' onClick={exportKey}>Export</Button>
          </ListItem>

        </List>
        <Fab color='secondary' disabled={disableFab} className={classes.fab} type='submit'>
          {loading.saveSetting ? <CircularProgress size={20} /> : <SaveIcon />}
        </Fab>
      </form>
    </div>
  );
}
