import React, { useState } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { TextField, Checkbox, FormControlLabel, FormGroup, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

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
    signed: false,
    encrypted: false,
    key: '',
  });


  const send = async (event) => {
    event.preventDefault();
    console.log(email);
    // const response = await fetch(`${config.API_URL}/api/auth/user`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(email)
    //   }
    // )
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
                checked={email.encrypted} onChange={(event) => { setEmail({ ...email, encrypted: event.target.checked }) }} />}
              label='Encryption'
            />
            {
              email.encrypted &&
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
                checked={email.signed} onChange={(event) => { setEmail({ ...email, signed: event.target.checked }) }} />}
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
          <Button type="submit" color="primary" variant='outlined' style={{ display: 'flex', marginLeft: 'auto' }}>Send</Button>
        </div>
      </form>

    </React.Fragment>
  );
}
