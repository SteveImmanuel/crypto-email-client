import React from 'react';
import Auth from '../utils/Auth';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  signInButton: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: '75%',
  },
  mainBody: {
    display: 'flex',
    alignItems: 'center',
    height: '75vh',
    flexDirection: 'column',
  },
  googleIconContainer: {
    backgroundColor: '#fff',
    margin: 2,
    marginRight: 12,
    padding: 12,
    height: '2md',
    width: '2md',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  googleIcon: {
    maxHeight: '32px',
  },
  titleSection: {
    marginTop: 72,
    paddingBottom: 72,
    fontSize: 42,
  },
  titleLogo: { paddingRight: 12 }
});

export const Login = (props) => {
  const classes = styles();
  console.log('login')
  return (
    <div>
      <div className={classes.mainBody}>
        <Typography align='center' variant='h6' className={classes.titleSection}>
          <img className={classes.titleLogo} src='cryptMailLogo.jpg' alt='cryptMailLogo' height='42px' />
          CryptMail
        </Typography>
        <Typography>Please Sign In to Continue</Typography>
        <br />
        <Button
          onClick={() => {
            Auth.login(() => { props.history.push('/') });
          }}
          variant='outlined'
          className={classes.signInButton}
          component='span'
        >
          <div className={classes.googleIconContainer}>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png'
              alt='logo'
              className={classes.googleIcon}
            />
          </div>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};
