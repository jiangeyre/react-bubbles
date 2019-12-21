import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosWithAuth from './utils/axiosWithAuth';
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";
import bubblez from './imgs/bubbles.png';

function App() {
  return (
    <Router>
      <div className="App">
        <img src={bubblez} alt="finding nemo bubbles yellow" style={{height: 300}} />
        <Switch>
          <PrivateRoute exact path='/private' component={BubblePage} />
          <Route exact path="/" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
