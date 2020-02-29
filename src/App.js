import React, { useEffect } from "react";
import { useAuth0 } from "./auth0-context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import CreateNewTopic from "./pages/CreateNewTopic";

import "bulma/css/bulma.css";

// const USER = gql`
//   {
//     queryUser{
//       username
//     }
//   }
// `

function App() {
  const { isAuthenticated } = useAuth0();
  // console.log(isAuthenticated)

  return (
    <BrowserRouter history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute exact path="/create" component={CreateNewTopic} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
