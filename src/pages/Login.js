import React from 'react';
import auth from '../utils/auth';

export const Login = (props) => {
  return (
    <div>
      <h1>This is Login Page</h1>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push('/');
          });
        }}>
        Login
      </button>
    </div>
  )
}