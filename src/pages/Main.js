import React from 'react';
import auth from '../utils/auth';

export const Main = (props) => {
  return (
    <div>
      <h1>This is Main Content Page</h1>
      <p>This path is protected. Must be authenticated.</p>
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push('/login');
          });
        }}>
        Logout
      </button>
    </div>
  )
}