import React, { useEffect, useState } from 'react';
import { formatToTimeZone } from 'date-fns-timezone';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, Card, CardContent, AppBar, Toolbar, IconButton, LinearProgress, Dialog, TextField, DialogActions, DialogContent, Button, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import config from '../../config';
import Auth from '../../utils/Auth';


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
    marginTop: 10
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
  const [key, setKey] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { id } = props.match.params;
  const { email: userEmail } = Auth.getData();


  const back = () => {
    props.history.goBack();
  }

  const fetchMail = async () => {
    const result = await fetch(`${config.API_URL}/api/mail/${id}`, {
      credentials: 'include'
    });

    if (!result.redirected) {
      const data = await result.json();
      setEmail(data);
    }
  }

  const styledDate = (datetime) => {
    // 29 Nov 2020, 20:10
    return formatToTimeZone(datetime, 'D MMM YYYY, HH:mm', { timeZone: 'Asia/Jakarta' });
  };

  const verify = () => {
    console.log('NOT IMPLEMENTED, verify')
    enqueueSnackbar('Verified', { variant: 'success' });
  }

  const decrypt = () => {
    setIsDialogOpen(true);
  }

  const handleClose = (value) => {
    setIsDialogOpen(false);
    if (value.action === 'submit' && key.length > 0) {
      // TODO decrypt
      console.log(key);
      console.log('NOT IMPLEMENTED, decrypt')
    }
  };

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

          <IconButton color='inherit' onClick={verify}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton color='inherit' onClick={decrypt}>
            <LockOpenIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {Object.keys(email).length === 0 ? <LinearProgress /> :
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
                    <td >{userEmail}</td>
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
              <Typography variant='body2' className={classes.content}>
                {email.message}
              </Typography>
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
