import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Transactions from './Transactions';


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/users">
          {/* <Users /> */}
        </Route>
        <Route path="/">
          {/* <Home /> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;
