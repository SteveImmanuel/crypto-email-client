import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  }
});


export default function Read(props) {
  const classes = styles();

  return (
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
  );
}
