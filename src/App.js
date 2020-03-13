import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import CreateNewTopic from "./pages/CreateNewTopic";
import ViewTopic from './pages/ViewTopic';

import "bulma/css/bulma.css";

// const USER = gql`
//   {
//     queryUser{
//       username
//     }
//   }
// `

function App() {

  return (
    <BrowserRouter history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute exact path="/create" component={CreateNewTopic} />
        <Route path="/topic/:id" exact component={ViewTopic} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
