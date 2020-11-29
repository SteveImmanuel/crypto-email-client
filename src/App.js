import React from 'react';
import { Login } from './pages/Login';
import Main from './pages/Main';
import auth from './utils/Auth';


function App() {
  if (auth.isAuthenticated()) {
    return <Main />;
  } else {
    return <Login />;
  }
}

export default App;
