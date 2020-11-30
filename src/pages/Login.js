import React from 'react';
import Auth from '../utils/Auth';
import { Button, Typography, CssBaseline } from '@material-ui/core';
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
    // justifyContent: 'center',
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
    fontSize: 32,
    display: 'flex',
    alignItems: 'center',
  },
  titleText: { paddingLeft: 12 }
});

export const Login = (props) => {
  const classes = styles();
  return (
    <div>
        <div className={classes.mainBody}>
        <Typography className={classes.titleSection}>
          <img src="cryptMailLogo.jpg" alt="cryptMailLogo" height="42px" />
          <h1 className={classes.titleText}>CryptMail</h1>
        </Typography>
        <Typography>Please Sign In to Continue</Typography>
        <br />
        <Button
          onClick={() => {
            Auth.login(() => {props.history.push('/app')});
          }}
          variant="outlined"
          className={classes.signInButton}
          component="span"
        >
          <div className={classes.googleIconContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
              alt="logo"
              className={classes.googleIcon}
            />
          </div>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};
