import React  from 'react';
import { useAuth0 } from './auth0-context';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

import "bulma/css/bulma.css"

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();
  console.log(user)
  return (
    <BrowserRouter>
    <div>
      <Navbar/>

    </div>
    </BrowserRouter>
  );
}

export default App;
