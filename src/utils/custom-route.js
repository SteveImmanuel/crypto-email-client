import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import auth from './auth';

//redirect to login page if visited when not authenticated
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (auth.isAuthenticated()) {
        return <Component {...props} />;
      } else {
        return <Redirect to={
          {
            pathname: '/login',
            state: {
              from: props.location
            }
          }
        } />;
      }
    }}
    />
  );
}

//redirect to protected path if visited when already authenticated
export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (auth.isAuthenticated()) {
        return <Redirect to={
          {
            pathname: '/',
            state: {
              from: props.location
            }
          }
        } />;
      } else {
        return <Component {...props} />;
      }
    }}
    />
  );
}