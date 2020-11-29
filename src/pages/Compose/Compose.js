import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { TextField, Checkbox, FormControl, FormControlLabel, FormGroup, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';

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


export default function Read(props) {
  const classes = styles();

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

          <IconButton color='inherit'>
            <SendIcon />
          </IconButton>
          <IconButton color='inherit'>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <TextField
          fullWidth
          required
          margin='dense'
          type='email'
          variant='outlined'
          label='To'
          value={props.recipient} />
        <TextField
          fullWidth
          margin='dense'
          type='text'
          variant='outlined'
          label='Subject'
          value={props.subject} />
        <FormControl className={classes.pgpForm}>
          {/* <FormLabel>PGP</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name='signature' />}
              label='Digital Signature'
            />
            <FormControlLabel
              control={<Checkbox name='encryption' />}
              label='Encryption'
            />
          </FormGroup>
        </FormControl>

        <TextField
          multiline
          fullWidth
          margin='normal'
          rows='10'
          rowsMax='20'
          type='text'
          variant='outlined'
          label='Message'
          value={props.message} />
      </div>
    </React.Fragment>
  );
}
