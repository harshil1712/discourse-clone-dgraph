import React  from 'react';
import { useAuth0 } from './auth0-context';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { useQuery } from '@apollo/react-hooks'
// import { gql } from 'apollo-boost'
import Navbar from './components/Navbar';
import Home from './pages/Home'

import "bulma/css/bulma.css"

// const USER = gql`
//   {
//     queryUser{
//       username
//     }
//   }
// `

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();
  // const {data} = useQuery(USER)
  // console.log(data)
  console.log(user)
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
