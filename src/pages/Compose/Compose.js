import React, { useState } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { TextField, Checkbox, FormControlLabel, FormGroup, AppBar, Toolbar, IconButton, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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
    marginTop: 10
  },
  pgpForm: {
    marginTop: 5
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 5,
  },
});


export default function Compose(props) {
  const classes = styles();
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    content: '',
    sign: false,
    encrypt: false,
    key: '',
  });
  const [isSending, setIsSending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const send = async (event) => {
    event.preventDefault();
    setIsSending(true);
    
    const response = await fetch(`${config.API_URL}/api/mail`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      }
    )
    
    setIsSending(false);

    let msg;
    if (response.status !== 200) {
      msg = { value: 'Failed to sent email', variant: 'error' };
    } else {
      msg = { value: 'Email sent successfully', variant: 'success' };
      props.history.push('/');
    }

    enqueueSnackbar(msg.value, { variant: msg.variant });
  }

  const back = () => {
    props.history.goBack();
  }

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

          <Typography className={classes.grow} variant='h6'>Compose</Typography>

        </Toolbar>
      </AppBar>

      <form onSubmit={send}>
        <div className={classes.container}>
          <TextField
            fullWidth
            required
            margin='dense'
            type='email'
            variant='outlined'
            label='To'
            value={email.to}
            onChange={(event) => { setEmail({ ...email, to: event.target.value }) }}
          />
          <TextField
            fullWidth
            required
            margin='dense'
            type='text'
            variant='outlined'
            label='Subject'
            value={email.subject}
            onChange={(event) => { setEmail({ ...email, subject: event.target.value }) }}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name='encryption'
                checked={email.encrypt} onChange={(event) => { setEmail({ ...email, encrypt: event.target.checked }) }} />}
              label='Encryption'
            />
            {
              email.encrypt &&
              <TextField
                fullWidth
                required
                margin='dense'
                type='text'
                variant='outlined'
                label='Encryption Key'
                value={email.key}
                onChange={(event) => { setEmail({ ...email, key: event.target.value }) }}
              />
            }
            <FormControlLabel
              control={<Checkbox name='signature'
                checked={email.sign} onChange={(event) => { setEmail({ ...email, sign: event.target.checked }) }} />}
              label='Digital Signature'
            />
          </FormGroup>

          <TextField
            multiline
            fullWidth
            required
            margin='normal'
            rows='10'
            rowsMax='20'
            type='text'
            variant='outlined'
            label='Message'
            value={email.content}
            onChange={(event) => { setEmail({ ...email, content: event.target.value }) }}
          />
          <Button type='submit' color='primary' variant='outlined' disabled={isSending} style={{ display: 'flex', marginLeft: 'auto' }}>
            {isSending ? <CircularProgress size={20} /> : 'Send'}
          </Button>
        </div>
      </form>

    </React.Fragment>
  );
}
