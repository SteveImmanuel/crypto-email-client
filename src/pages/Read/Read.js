import React, { useEffect, useState } from 'react';
import { formatToTimeZone } from 'date-fns-timezone';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, Card, CardContent, AppBar, Toolbar, IconButton, LinearProgress, Dialog, TextField, DialogActions, DialogContent, Button, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import config from '../../config';


const styles = makeStyles({
  list: {
    minWidth: 250,
    width: '100%',
  },
  container: {
    margin: 15
  },
  subject: {
    marginBottom: 10
  },
  detailKey: {
    color: fade('rgba(0, 0, 0)', 0.54),
    paddingRight: 10
  },
  content: {
    marginTop: 10,
    overflow: 'auto',
  },
  contentText: {
    whiteSpace: 'pre-line',
    overflowWrap: 'break-word',
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 5,
  },
});

export default function Read(props) {
  const classes = styles();
  const [email, setEmail] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [key, setKey] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { id } = props.match.params;


  const back = () => {
    props.history.goBack();
  }

  const fetchMail = async () => {
    const result = await fetch(`${config.API_URL}/api/mail/${id}`, {
      credentials: 'include'
    });

    if (!result.redirected) {
      const data = await result.json();
      setEmail({ ...data, show: data.message });
      setLoading(false);
    }
  }

  const styledDate = (datetime) => {
    // 29 Nov 2020, 20:10
    return formatToTimeZone(datetime, 'D MMM YYYY, HH:mm', { timeZone: 'Asia/Jakarta' });
  };

  const verify = async () => {
    const response = await fetch(`${config.API_URL}/api/sign/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        msg: email.message,
        senderEmail: email.sender
      })
    })
    if (response.status === 404) {
      enqueueSnackbar("Sender's public key not found", { variant: 'error' });
    } else if (response.status !== 200) {
      enqueueSnackbar('Error verifying message', { variant: 'error' });
    } else {
      const data = await response.json();
      if (data.data.verified) {
        enqueueSnackbar('Email verified', { variant: 'success' });
      } else {
        enqueueSnackbar('Email not verified', { variant: 'warning' });
      }
    }

    setLoading(false);
  }

  const openDialog = () => {
    if (email.encrypted) {
      setEmail({ ...email, show: email.encrypted });
      setIsDecrypted(true);
    } else {
      setIsDialogOpen(true);
    }
  }

  const decrypt = async () => {
    const response = await fetch(`${config.API_URL}/api/decrypt`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: email.message,
        key: key
      })
    })

    if (response.status !== 200) {
      enqueueSnackbar('Error decrypting message', { variant: 'error' });
    } else {
      const data = await response.json();
      setEmail({ ...email, show: data.data, encrypted: data.data });
      enqueueSnackbar('Email decrypted', { variant: 'success' });
      setIsDecrypted(true);
    }
    setLoading(false);
  }

  const handleClose = (value) => {
    setIsDialogOpen(false);
    if (value.action === 'submit' && key.length > 0) {
      setLoading(true);
      decrypt();
    }
  };

  const unDecrypt = () => {
    setIsDecrypted(false);
    setEmail({ ...email, show: email.message });
  }

  useEffect(() => {
    if (Object.keys(email).length === 0) {
      fetchMail();
    }
  })

  return (
    <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            onClick={back}
          >
            <KeyboardBackspaceIcon />
          </IconButton>

          <Typography className={classes.grow} variant='h6'>View</Typography>

          <IconButton
            color='inherit'
            onClick={() => {
              setLoading(true);
              verify();
            }}
            disabled={loading}
          >
            <CheckCircleIcon />
          </IconButton>
          {isDecrypted ?

            <IconButton
              color='inherit'
              onClick={unDecrypt}
              disabled={loading}
            >
              <LockIcon />
            </IconButton>
            :
            <IconButton
              color='inherit'
              onClick={openDialog}
              disabled={loading}
            >
              <LockOpenIcon />
            </IconButton>

          }
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress />}
      {Object.keys(email).length !== 0 &&
        <div className={classes.container}>
          <Card>
            <CardContent>
              <Typography variant='h6'>{email.subject}</Typography>
            </CardContent>
          </Card>
          <Card className={classes.content}>
            <CardContent>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.detailKey}>From</td>
                    <td >{email.sender}</td>
                  </tr>
                  <tr>
                    <td className={classes.detailKey}>To</td>
                    <td >{email.receiver}</td>
                  </tr>
                  <tr>
                    <td className={classes.detailKey}>Date</td>
                    <td >{styledDate(email.date)}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className={classes.content}>
            <CardContent>
              {email.html ?
                <div dangerouslySetInnerHTML={{ __html: email.html || email.show }} /> :

                <Typography variant='body2' className={classes.contentText}>
                  {email.show}
                </Typography>

              }
            </CardContent>
          </Card>

        </div>
      }
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Insert Encryption Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Encryption Key"
            type="text"
            value={key}
            onChange={(event) => { setKey(event.target.value) }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose({ action: 'cancel' }) }} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { handleClose({ action: 'submit' }) }} color="primary">
            Decrypt
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
